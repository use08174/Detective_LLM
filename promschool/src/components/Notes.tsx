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
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import Topics from "rpg/data/topics";

interface NotesModalProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesModal = ({ notes, setNotes }: NotesModalProps) => {
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
            src="/assets/web/instruction.png"
            alt="button image"
            width={"90%"}
          />
          {!isSmallScreen && (
            <Heading fontFamily="azonix" size="lg" textColor={"black"}>
              Notes
            </Heading>
          )}
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent maxW="fit-content" maxH={"fit-content"}>
          <ModalBody width={"50vw"} padding={4}>
            <Textarea
              fontFamily={"pretendardLight"}
              value={notes}
              rows={30}
              placeholder="Notes"
              onChange={e => setNotes(e.target.value)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotesModal;
