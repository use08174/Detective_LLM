import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  AspectRatio,
  Box,
  Image,
  Center,
  Flex,
  Text,
  Stack,
  Card,
  CardBody,
  VStack,
  Input,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import characters from "rpg/data/characters";
import Topics from "rpg/data/topics";
import { EastworldClient, Message } from "eastworld-client";
import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { EnglishToKorean, KoreanToEnglish } from "./util/Korean";

type ChatModalProps = {
  sessionId: string;
  eastworldClient: EastworldClient;
  notes: string;
  setNotes: (notes: string) => void;
};

const ChatModal = (props: ChatModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [agentName, setAgentName] = useState("");
  const [photoPath, setPhotoPath] = useState("");
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messageHistory]);

  useEffect(() => {
    if (!agentName) return;

    setMessageHistory([]);

    props.eastworldClient.gameSessions.startChat(
      props.sessionId,
      EnglishToKorean(agentName),
      EnglishToKorean(characters.detective.eastworldId!),
      { history: [], conversation: {} },
    );
  }, [agentName]);

  const chat = async (message: string) => {
    setMessageHistory(messages => [
      ...messages,
      { role: Message.role.USER, content: message },
    ]);

    setMessage("");

    let interact;

    try {
      interact = await props.eastworldClient.gameSessions.interact(
        props.sessionId,
        EnglishToKorean(agentName),
        message,
      );
    } catch (e) {
      return;
    }

    const response = interact.response;

    if ("content" in response) {
      setMessageHistory(messages => [...messages, response]);
    } else {
      close();

      PubSub.publish(Topics.action, {
        character: EnglishToKorean(agentName),
        action: response.action,
      });
    }
  };

  PubSub.subscribe(Topics.enterChat, (_channel, message: string) => {
    setAgentName(message);
    setPhotoPath(characters[message as keyof typeof characters].photo);
    onOpen();
  });

  const close = () => {
    PubSub.publish(Topics.giveKeysToGame);
    onClose();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay onClick={close} />
        <ModalContent
          maxW="90vw"
          maxH="fit-content"
          bg="transparent"
          boxShadow="none"
        >
          <ModalBody>
            <VStack>
              <Stack
                direction={{ base: "column", xl: "row" }}
                width="100%"
                height="auto"
                justifyContent="center"
                alignItems="center"
                gap={4}
              >
                <AspectRatio
                  width={{ base: "100%", xl: "50%" }}
                  height="70vh"
                  ratio={1}
                  onClick={handleCardClick}
                >
                  <Center paddingLeft={3} paddingRight={3}>
                    <Image src={photoPath} objectFit={"cover"}></Image>
                    <Center
                      position="absolute"
                      bottom="0"
                      width="100%"
                      bg="blackAlpha.700"
                      height="15%"
                      borderRadius={"l"}
                      fontFamily={"pretendardExtraBold"}
                      textColor={"white"}
                      fontSize={"3xl"}
                      textAlign={"center"}
                      letterSpacing={"0.2rem"}
                    >
                      {EnglishToKorean(agentName)}
                    </Center>
                  </Center>
                </AspectRatio>
                <AspectRatio
                  width={{ base: "100%", xl: "50%" }}
                  height="70vh"
                  ratio={1}
                  paddingLeft={3}
                  paddingRight={3}
                  borderRadius="xl"
                  onClick={handleCardClick}
                >
                  <Card
                    width="100%"
                    height="100%"
                    fontFamily={"pretendardLight"}
                  >
                    <CardBody width="100%" height="100%">
                      <Flex direction="column" h="full">
                        <Box
                          ref={boxRef}
                          flexGrow={1}
                          overflow={"auto"}
                          fontSize={"xl"}
                          marginBottom={2}
                        >
                          {messageHistory.map((message, index) => (
                            <Box
                              key={index}
                              borderRadius={"0.5vw"}
                              paddingTop={1}
                              paddingBottom={1}
                              paddingLeft={3}
                              paddingRight={3}
                              marginBottom={3}
                              width={"fit-content"}
                              color="white"
                              backgroundColor={
                                message.role === Message.role.USER
                                  ? "gray.900"
                                  : "red.500"
                              }
                              marginLeft={
                                message.role === Message.role.USER
                                  ? "auto"
                                  : "0"
                              }
                              marginRight={
                                message.role !== Message.role.USER
                                  ? "auto"
                                  : "0"
                              }
                            >
                              <Text key={index}>{message.content}</Text>
                            </Box>
                          ))}
                        </Box>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            chat(message);
                          }}
                        >
                          <Flex width="100%">
                            <FormControl flex="1">
                              <Input
                                fontFamily={"pretendardLight"}
                                size={"lg"}
                                autoComplete="off"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                              />
                            </FormControl>
                            <IconButton
                              ml={2}
                              flexShrink={0}
                              colorScheme="red"
                              size={"lg"}
                              type="submit"
                              aria-label="Submit"
                              icon={<ArrowForwardIcon />}
                            ></IconButton>
                          </Flex>
                        </form>
                      </Flex>
                    </CardBody>
                  </Card>
                </AspectRatio>
              </Stack>
              <Card
                width={"100%"}
                height={"15%"}
                borderRadius="xl"
                onClick={handleCardClick}
              >
                <CardBody
                  width="100%"
                  height="100%"
                  borderRadius="xl"
                  boxShadow="lg"
                  bg="blackAlpha.900"
                  color="white"
                >
                  <Textarea
                    size={"lg"}
                    resize={"none"}
                    rows={5}
                    fontFamily={"pretendardLight"}
                    placeholder="이곳에 발견한 증거를 기록해보세요..."
                    value={props.notes}
                    onChange={e => props.setNotes(e.target.value)}
                  ></Textarea>
                </CardBody>
              </Card>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;
