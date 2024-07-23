import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

export const ProfileModal = ({ user, children }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        p={0}
        w="100%"
        h="100%"
      >
        {children ? children : <FaEye />}
      </Button>

      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent rounded={20}>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
          >
            name : {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent={"space-evenly"}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text pt={10}>Email : {user.email}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
