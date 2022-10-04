import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Textarea,
  VStack,
  IconButton,
  Icon,
  Text,
  Tag,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  ModalProps,
} from "@chakra-ui/react";

// import { Container } from './styles';

type IProps = {
  isOpen: boolean;
  onClose(e: boolean): void;
  title: string;
  label: string;
  body: JSX.Element | JSX.Element[];
  positve_label?: string;
  negative_label?: string;
  modalProps?: Omit<Omit<Omit<ModalProps, "children">, "isOpen">, "onClose">
};

const ModalApp: React.FC<IProps> = ({
  isOpen,
  onClose,
  title,
  label,
  body,
  negative_label,
  positve_label,
  modalProps
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{label}</Text>

          {body}
        </ModalBody>

        <ModalFooter>
          {negative_label && (
            <Button variant="ghost" mr={3} onClick={() => onClose(false)}>
              {negative_label}
            </Button>
          )}
          {positve_label && (
            <Button colorScheme="orange" onClick={() => onClose(true)}>
              {positve_label}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalApp;
