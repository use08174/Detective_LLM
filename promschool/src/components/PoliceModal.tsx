import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
  FormControl,
  Textarea,
  FormErrorMessage,
  Button,
  Stack,
  AspectRatio,
  Center,
  Image,
  Card,
  CardBody,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";
import characters from "rpg/data/characters";
import Topics from "rpg/data/topics";
import { EastworldClient } from "eastworld-client";
import { useEffect, useState } from "react";
import story from "rpg/data/story";
import { GameResult, ResultScreenProps } from "./ResultScreen";
import { logEndGame } from "analytics";
import { KoreanToEnglish } from "./util/Korean";

type PoliceModalProps = {
  eastworldClient: EastworldClient;
};

const PoliceModal = ({ eastworldClient }: PoliceModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [suspect, setSuspect] = useState("");
  const [suspectValid, setSuspectValid] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [explanationValid, setExplanationValid] = useState(true);

  useEffect(() => {
    let sanitizedName = KoreanToEnglish(suspect);

    setSuspectValid(
      sanitizedName in characters && characters[sanitizedName].arrestable,
    );
  }, [suspect]);

  useEffect(() => {
    setExplanationValid(explanation.trim() !== "");
  }, [explanation]);

  PubSub.subscribe(Topics.enterArrestModal, () => {
    onOpen();
  });

  const close = () => {
    PubSub.publish(Topics.giveKeysToGame);
    onClose();
  };

  const arrest = async () => {
    if (!explanationValid) {
      setExplanationValid(false);
      return;
    }

    if (KoreanToEnglish(suspect) === "Jiyoon") {
      const score = await eastworldClient.llm.rate(
        `플레이어가 탐정으로서 살인 미스터리 게임을 플레이하고 있습니다.
그들이 발견해야 할 실제 플롯은 다음과 같습니다:
"${story.explanation}"

이것은플레이어가설명한사건의내용입니다:
"${explanation}"

이것이 실제 플롯과 얼마나 가까운가요?
`,
      );
      const result: ResultScreenProps = {
        status: GameResult.WIN,
        score: score,
      };
      PubSub.publish(Topics.endGame, result);
      logEndGame(true);
    } else {
      const result: ResultScreenProps = {
        status: GameResult.LOSS,
        suspect: KoreanToEnglish(suspect),
      };
      PubSub.publish(Topics.endGame, result);
      logEndGame(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="fit-content"
          maxH={"fit-content"}
          boxShadow={"none"}
          bg="transparent"
        >
          <ModalBody>
            <Stack
              direction={{ base: "column", xl: "row" }}
              width={"80vw"}
              maxW={"1500px"}
              justifyContent="center"
              alignItems="center"
              gap={6}
            >
              <AspectRatio
                width={{ base: "80%", xl: "50%" }}
                ratio={1}
                maxWidth={"1100px"}
              >
                <Center paddingLeft={3} paddingRight={3}>
                  <Image
                    borderRadius="xl"
                    src={"/assets/photos/police_chief.jpeg"}
                    objectFit={"cover"}
                    boxShadow={"0px 0px 5px 6px #969696"}
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
                    fontFamily={"PretendardSemiBold"}
                    textColor={"white"}
                    fontSize={"5xl"}
                  >
                    형사
                  </Center>
                </Center>
              </AspectRatio>
              <AspectRatio
                width={{ base: "80%", xl: "50%" }}
                ratio={1}
                maxWidth={"1100px"}
                boxShadow={"0px 0px 5px 6px #969696"}
                paddingLeft={3}
                paddingRight={3}
                borderRadius={"xl"}
              >
                <Card width={"100%"} height={"100%"}>
                  <CardBody width={"100%"} height={"100%"}>
                    <Flex direction="column" height="100%">
                      <FormControl isInvalid={!suspectValid} marginBottom={6}>
                        <Heading
                          fontFamily={"azonix"}
                          size={"lg"}
                          marginBottom={2}
                        >
                          누구를 체포할까요?
                        </Heading>
                        <Input
                          fontFamily={"pretendardLight"}
                          size={"lg"}
                          value={suspect}
                          autoComplete="off"
                          placeholder="범인의 이름"
                          onChange={e => setSuspect(e.target.value)}
                        />
                        <FormErrorMessage fontFamily={"pretendardLight"}>
                          잘못된 이름입니다!
                        </FormErrorMessage>
                      </FormControl>
                      <Flex flex="1">
                        <FormControl height="100%" isInvalid={!explanationValid}>
                          <Heading fontFamily={"azonix"} size={"lg"}>
                            무슨 일이 일어났나요?
                          </Heading>
                          <Textarea
                            fontFamily={"pretendardLight"}
                            size={"lg"}
                            resize={"none"}
                            height={"80%"}
                            value={explanation}
                            onChange={e => setExplanation(e.target.value)}
                          />
                          <FormErrorMessage fontFamily={"pretendardLight"}>
                            설명을 적어주셔야 합니다.
                          </FormErrorMessage>
                        </FormControl>
                      </Flex>
                      <Box width="100%">
                        <Button
                          fontFamily={"azonix"}
                          width="100%"
                          colorScheme="red"
                          flexShrink={0}
                          onClick={() => arrest()}
                          isDisabled={!suspectValid || !explanationValid}
                        >
                          체포
                        </Button>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </AspectRatio>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PoliceModal;