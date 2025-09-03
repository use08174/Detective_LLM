import asyncio
import json
import os
import re
from typing import Any, Dict, List, Optional, Union

from aiohttp import ClientSession

from llm.base import LLMBase
from schema import ActionCompletion, Message

import httpx
from openai import AsyncOpenAI

def _parse_messages(messages: List[Message]) -> List[Dict[str, Any]]:
    """
    프로젝트의 Message -> OpenAI SDK messages 포맷으로 변환.
    tool 메시지의 경우 name/Tool result를 지원하려면 여기서 확장하세요.
    """
    out: List[Dict[str, Any]] = []
    for m in messages:
        role = m.role
        content = m.content if m.content is not None else ""

        if role not in {"system", "user", "assistant", "tool"}:
            # fallback
            role = "user"

        msg: Dict[str, Any] = {"role": role, "content": content}
        # 필요 시 name, tool_call_id 등 추가
        if getattr(m, "name", None):
            msg["name"] = m.name  # e.g., tool 메시지에서 함수 이름을 저장했을 때
        out.append(msg)
    return out


def _functions_to_tools(functions: List[Dict[str, Any]] | None) -> List[Dict[str, Any]] | None:
    """
    레거시 'functions' 스키마(name, description, parameters(JSON Schema))를
    신형 SDK의 tools 형식으로 변환.
    """
    if not functions:
        return None
    tools: List[Dict[str, Any]] = []
    for f in functions:
        # 기대 형태 예:
        # {
        #   "name": "search_web",
        #   "description": "Search the web",
        #   "parameters": { "type": "object", "properties": {...}, "required": [...] }
        # }
        tools.append({"type": "function", "function": f})
    return tools
class OpenAIInterface(LLMBase):
    """
    신형 OpenAI Python SDK(>=1.x) 기반 비동기 LLM 래퍼.
    - Chat Completions (도구 호출/함수 호출 지원)
    - Embeddings
    - 클린업: aclose() 필수 호출(서버 종료 시)
    """

    def __init__(
        self,
        api_key: str = "",
        model: str = "gpt-4o-mini",          # 기본 채팅 모델
        embedding_size: int = 3072,          # text-embedding-3-large 차원
        api_base: Optional[str] = None,      # 신형 SDK에서는 base_url
        project: Optional[str] = None,       # sk-proj-* 키 사용하는 경우 지정 권장
        timeout: float = 60.0,
        client_session: Optional[object] = None,  # ← 하위호환용: 전달되면 무시
    ):
        self._model = model
        self._embedding_size = embedding_size

        key = api_key or os.getenv("OPENAI_API_KEY")
        if not key:
            raise RuntimeError("OPENAI_API_KEY is not set")

        base_url = api_base or os.getenv("OPENAI_BASE_URL") or None
        project = project or os.getenv("OPENAI_PROJECT")

        # httpx.AsyncClient를 직접 주입하여 timeout/프록시 등 제어
        self._http = httpx.AsyncClient(timeout=timeout)

        print(f"OpenAIInterface: model={model}, embedding_size={embedding_size}, base_url={base_url}, project={project}")
        self._client = AsyncOpenAI(
            api_key=key,
            base_url=base_url,
            project=project,
            http_client=self._http,
        )
        print("successfully initialized OpenAIInterface")

    async def aclose(self) -> None:
        """비동기 클라이언트 정리 (FastAPI lifespan 종료 시 호출 필수)."""
        try:
            await self._client.close()
        except Exception:
            pass
        try:
            await self._http.aclose()
        except Exception:
            pass

    # ---------- High-level APIs ----------

    async def embed(self, text: str, model: str = "text-embedding-3-large") -> List[float]:
        """
        임베딩 1개 생성 후 벡터 반환.
        """
        resp = await self._client.embeddings.create(
            model=model,
            input=text,
        )
        return resp.data[0].embedding

    async def completion(
        self,
        messages: List[Message],
        functions: List[Dict[str, Any]],
    ) -> Union[Message, ActionCompletion]:
        """
        레거시 'functions' 입력을 받아 도구 호출(tool_calls)을 처리.
        도구 호출이 있으면 ActionCompletion 반환, 없으면 assistant 메시지 반환.
        """
        tools = _functions_to_tools(functions)
        resp = await self._client.chat.completions.create(
            model=self._model,
            messages=_parse_messages(messages),
            tools=tools,
            tool_choice="auto" if tools else None,
        )
        choice = resp.choices[0]
        msg = choice.message

        # 신형 SDK: tool_calls 필드로 함수 호출이 전달됨
        if msg.tool_calls:
            call = msg.tool_calls[0]
            name = call.function.name
            raw_args = call.function.arguments or "{}"
            try:
                args = json.loads(raw_args)
            except json.JSONDecodeError:
                args = {}
            return ActionCompletion(action=name, args=args)

        return Message(role="assistant", content=msg.content or "")

    async def chat_completion(
        self,
        messages: List[Message],
    ) -> Message:
        """
        일반 채팅(함수 호출 없음).
        """
        resp = await self._client.chat.completions.create(
            model=self._model,
            messages=_parse_messages(messages),
        )
        content = resp.choices[0].message.content or ""
        return Message(role="assistant", content=content)

    async def action_completion(
        self,
        messages: List[Message],
        functions: List[Dict[str, Any]],
        retries: int = 3,
    ) -> Optional[ActionCompletion]:
        """
        함수 호출이 나올 때까지 최대 retries번 시도.
        각 시도에서 assistant의 자연어 응답만 온다면 시스템 메시지를 추가해 재요청.
        """
        tools = _functions_to_tools(functions)
        msgs = list(messages)

        for _ in range(max(1, retries)):
            resp = await self._client.chat.completions.create(
                model=self._model,
                messages=_parse_messages(msgs),
                tools=tools,
                tool_choice="auto" if tools else None,
            )
            msg = resp.choices[0].message

            if msg.tool_calls:
                call = msg.tool_calls[0]
                name = call.function.name
                raw_args = call.function.arguments or "{}"
                try:
                    args = json.loads(raw_args)
                except json.JSONDecodeError:
                    args = {}
                return ActionCompletion(action=name, args=args)

            # 함수 호출이 아니면 대화에 응답을 추가하고 재시도
            msgs.append(Message(role="assistant", content=msg.content or ""))
            msgs.append(
                Message(
                    role="system",
                    content="That was not a function call. Please call a function.",
                )
            )

        return None