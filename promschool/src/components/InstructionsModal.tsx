import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Image,
  VStack,
  Heading,
  Text,
  AspectRatio,
  Center,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Topics from "rpg/data/topics";
import { isProduction } from "env";

export default function InstructionsModal() {
  const [isSmallScreen] = useMediaQuery(
    "(max-height: 600px) or (max-width: 80em)",
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const open = () => {
    PubSub.publish(Topics.giveKeysToDom);
    onOpen();
  };

  const close = () => {
    PubSub.publish(Topics.giveKeysToGame);
    onClose();
  };

  // Open this once when game starts; this modal should only be created once.
  useEffect(() => {
    if (isProduction) {
      PubSub.publish(Topics.giveKeysToDom);
      onOpen();
    }
  }, [onOpen]);

  return (
    <>
      <Box
        as="button"
        width={"95%"}
        height={"23vh"}
        backgroundColor={"white"}
        padding={4}
        border={"solid 2px #333"}
        borderRadius={"1vw"}
        transition="transform 0.3s ease-in-out"
        _hover={{
          transform: "scale(1.05)",
          cursor: "pointer",
          backgroundColor: "#f1f1f1",
        }}
        onClick={open}
      >
        <VStack>
          <Image
            src="/assets/web/detective.png"
            alt="button image"
            width={"90%"}
            margin="1vh 0 1vh 0"
          />
          {!isSmallScreen && (
            <Heading fontFamily="azonix" size="lg" textColor={"black"}>
              Info
            </Heading>
          )}
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={close} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding={4}>
            <HStack width={"100%"}>
              <AspectRatio width={"50%"} ratio={1} maxWidth={"1100px"}>
                <Center paddingLeft={3} paddingRight={3}>
                  <Image
                    borderRadius="xl"
                    src={"/assets/photos/detective.jpeg"}
                    objectFit={"cover"}
                  ></Image>
                  <Image
                    position="absolute"
                    bottom="0"
                    width="100%"
                    height="15%"
                    borderRadius={"xl"}
                    src="/assets/web/blackboard.jpg"
                  ></Image>
                  <Center
                    position="absolute"
                    bottom="0"
                    width="100%"
                    height="15%"
                    borderRadius={"xl"}
                    fontFamily={"pretendardSemiBold"}
                    textColor={"white"}
                    fontSize={"5xl"}
                  >
                    정승은 살인사건
                  </Center>
                </Center>
              </AspectRatio>
              <Text
                fontFamily={"pretendardLight"}
                fontSize={"xl"}
                width={"50%"}
                whiteSpace={"pre-wrap"}
              >
                2024년 8월 23일, 프메 고등학교에서 살인사건이 발생했다. 피해자는
                2학년에 재학 중인 학생회장 정승은. 그는 누구에게, 어떻게 살해된
                것일까?
                <br />
                <br />
                당신은 살인 사건의 범인을 찾기 위해 파견된 탐정 김프메입니다.
                지혜와 기술을 사용하여 증거를 찾고, 용의자를 심문하며, 무슨 일이
                일어났는지 파악하세요.
                <br />
                <br />
                <br />
                Controls:
                <br />
                [WASD] 또는 방향키로 움직이세요
                <br />
                [Space] 키를 눌러서 대화할 수 있을 때 나타나는 프롬프트에서
                사람들과 대화하세요.
                <br />
                [Space] 키를 눌러 증거를 조사하세요. 중요한 증거 근처에 있을 때
                별도의 표시가 없으므로 주의 깊게 살펴보세요!
                <br />
                <br />
                Tip: 우측의 노트를 이용해 증거와 알리바이를 수집하고
                교차검증하세요
              </Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
