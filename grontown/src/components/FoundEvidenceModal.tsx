import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Modal,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  VStack,
  Image,
  Heading,
  Text,
  Textarea,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import evidence from "rpg/data/evidence";
import { getGameState } from "rpg/data/persistence";
import Topics from "rpg/data/topics";
import CroppedImage from "./util/CroppedImage";
import { EnglishToKorean } from "./util/Korean";

interface FoundEvidenceModalProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export default function FoundEvidenceModal(props: FoundEvidenceModalProps) {
  const [isSmallScreen] = useMediaQuery(
    "(max-height: 600px) or (max-width: 80em)",
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [foundEvidence, setFoundEvidence] = useState<string[]>([]);

  const open = () => {
    PubSub.publish(Topics.giveKeysToDom);
    setFoundEvidence(Array.from(getGameState().foundEvidence));
    onOpen();
  };

  const close = () => {
    PubSub.publish(Topics.giveKeysToGame);
    onClose();
  };

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
            src="/assets/web/clue.png"
            alt="button image"
            width={"70%"}
            margin="1vh 0 1vh 0"
          />
          {!isSmallScreen && (
            <Heading fontFamily="azonix" size="lg" textColor={"black"}>
              Clues
            </Heading>
          )}
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={close} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack gap={4}>
              <Accordion allowToggle width={"100%"}>
                {foundEvidence.length === 0 && (
                  <Center>
                    <Heading fontFamily={"pretendardExtraBold"} size={"xl"}>
                      증거가 없습니다
                    </Heading>
                  </Center>
                )}
                {foundEvidence.map((evidenceKey, index) => (
                  <AccordionItem key={index} width={"100%"}>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Heading size={"xl"} fontFamily={"pretendardLight"}>
                          {EnglishToKorean(evidenceKey)}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CroppedImage
                        imgSrc={
                          evidence[evidenceKey as keyof typeof evidence].photo
                        }
                      />
                      <Text
                        fontFamily={"pretendardLight"}
                        fontSize={"xl"}
                        whiteSpace="pre-wrap"
                      >
                        {evidence[evidenceKey as keyof typeof evidence].text}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              {foundEvidence.length > 0 && (
                <Textarea
                  fontFamily={"pretendardLight"}
                  placeholder="증거에서 뭔가를 찾으셨나요? 여기에 적어두세요!"
                  value={props.notes}
                  rows={10}
                  onChange={e => props.setNotes(e.target.value)}
                />
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
