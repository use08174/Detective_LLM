// src/pages/ProloguePage.tsx

import { useState, useEffect } from "react";
import { Box, Image, Text, Center, Fade, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// 1. 대화와 캐릭터를 포함하는 새로운 데이터 타입 정의
interface Dialogue {
  character?: string;
  text: string;
}

interface Scenario {
  image: string;
  dialogues: Dialogue[];
}

// (위에 제안한 새로운 scenarios 데이터를 여기에 붙여넣으세요)
// (수정된 scenarios 데이터 예시)
const scenarios = [
  // Scene 1: 나의 방
  {
    image: "/assets/prologue_scenes/scene1.png",
    dialogues: [
      { character: "나", text: "(창밖을 보며) ...이제 슬슬 독립해야할 것 같은데." },
      { character: "나", text: "조금 무섭기도 하지만, 부딪혀봐야지. 그래, 결심했어!" },
    ],
  },
  // Scene 2: 엄마의 등장
  {
    image: "/assets/prologue_scenes/scene2.png",
    dialogues: [
      { character: "엄마", text: "무슨 생각을 그렇게 깊게 하니? 표정이 심각하네." },
      { character: "나", text: "엄마. 저... 이제 슬슬 독립해야 할 것 같아요." },
      { character: "엄마", text: "(한숨) 말이야 쉽지. 밥은, 빨래는... 혼자 할 수 있겠어?" },
    ],
  },
  // Scene 3: 엄마의 응원과 통장
  {
    image: "/assets/prologue_scenes/scene3.png",
    dialogues: [
      { character: "엄마", text: "...알겠다. 네 인생인데 엄마가 어떻게 말리겠니. 대신 힘들면 꼭 전화해." },
      { character: "엄마", text: "자, 이거. 보증금엔 보탬이 될 거다." },
      { character: "[시스템]", text: "'엄마의 비상금' 10,000,000원을 획득했다!" },
    ],
  },
  // Scene 4: 새로운 시작
  {
    image: "/assets/prologue_scenes/scene4.png",
    dialogues: [
      { character: "나", text: "여기가 바로... 모든 것의 시작이구나." },
      { character: "[시스템]", text: "'첫걸음 마을' 앱에서 새로운 메시지가 도착했습니다." },
    ],
  },
];

const ProloguePage = () => {
  const navigate = useNavigate();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0); // 현재 대화 순서를 위한 상태 추가

  // 2. 'Enter'를 누르면 다음 대사/장면으로 넘어가는 로직 수정
  const handleNext = () => {
    const currentScene = scenarios[sceneIndex];
    
    // 현재 씬에 다음 대사가 있다면
    if (dialogueIndex < currentScene.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } 
    // 현재 씬의 마지막 대사라면
    else {
      // 다음 씬이 있다면
      if (sceneIndex < scenarios.length - 1) {
        setSceneIndex(sceneIndex + 1);
        setDialogueIndex(0); // 다음 씬의 첫 대사로 초기화
      } 
      // 모든 씬이 끝났다면
      else {
        navigate("/game"); // 게임 메인 페이지로 이동
      }
    }
  };

  // 3. 키보드 이벤트 감지 useEffect (로직은 동일, 함수 이름만 변경)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sceneIndex, dialogueIndex]); // sceneIndex나 dialogueIndex가 바뀔 때마다 함수 새로 등록

  const currentScene = scenarios[sceneIndex];
  const currentDialogue = currentScene.dialogues[dialogueIndex];

  return (
    <Box position="relative" height="100vh" width="100vw" bg="black" overflow="hidden">
      {/* 배경 이미지 (씬이 바뀔 때만 Fade 효과) */}
      <Fade in={true} key={sceneIndex}>
        <Image
          src={currentScene.image}
          alt="Prologue Scene"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Fade>

      {/* 하단 자막 */}
      <Box
        position="absolute"
        bottom="10%"
        left="50%"
        transform="translateX(-50%)"
        width="80%"
        bg="rgba(0, 0, 0, 0.75)"
        color="white"
        p="6"
        borderRadius="md"
      >
        {/* 대사가 바뀔 때마다 Fade 효과 */}
        <Fade in={true} key={`${sceneIndex}-${dialogueIndex}`}>
          <VStack spacing={2} align="start">
            {/* 캐릭터 이름이 있는 경우에만 표시 */}
            {currentDialogue.character && (
              <Text fontSize="xl" fontFamily="Pretendard-Bold" color="yellow.300">
                {currentDialogue.character}
              </Text>
            )}
            <Text fontSize="2xl" fontFamily="Pretendard-SemiBold">
              {currentDialogue.text}
            </Text>
          </VStack>
        </Fade>
      </Box>

      {/* 안내 문구 */}
      <Center position="absolute" bottom="3%" width="100%">
        <Text color="gray.300" fontSize="lg" animation="pulse 1.5s infinite">
          Press Enter to Continue
        </Text>
      </Center>
    </Box>
  );
};

// CSS에 간단한 애니메이션 추가 (optional)
const pulseAnimation = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
const style = document.createElement('style');
style.innerHTML = pulseAnimation;
document.head.appendChild(style);


export default ProloguePage;