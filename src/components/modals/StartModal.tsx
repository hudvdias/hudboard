import { Button, Divider, Flex, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { useBoard } from "../../hooks/useBoard";

import { useModal } from "../../hooks/useModal";

export function StartModal() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const { isStartModalOpen, toggleStartModal } = useModal();
  const { createBoard, loadBoard } = useBoard();

  async function handleCreate() {
    const boardId = await createBoard(name);
    if (boardId) toggleStartModal();
  };

  async function handleLoad() {
    const boardId = await loadBoard(id);
    if (boardId) toggleStartModal();
  };

  return(
    <Modal
      isOpen={isStartModalOpen}
      onClose={() => {}}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        borderRadius="3xl"
        paddingX="64px"
        paddingY="48px"
      >
        <ModalBody>
          <Heading
            textAlign="center"
            marginBottom="40px"
          >
            Welcome to Hudboard!
          </Heading>
          <Flex
            height="160px"
            alignItems="center"
          >
            <Flex
              flexDirection="column"
            >
              <FormLabel
                textAlign="center"
                marginRight="0"
              >
                Insert your Board ID here
              </FormLabel>
              <Input
                placeholder="Board ID"
                variant="filled"
                textAlign="center"
                borderRadius="full"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
              <Button
                colorScheme="blue"
                borderRadius="full"
                marginTop="16px"
                onClick={() => handleLoad()}
              >
                Load Board
              </Button>
            </Flex>
            <Divider
              orientation="vertical"
              marginX="64px"
            />
            <Flex
              flexDirection="column"
            >
              <FormLabel
                textAlign="center"
                marginRight="0"
              >
                Or create a new one
              </FormLabel>
              <Input
                placeholder="Board Name"
                variant="filled"
                textAlign="center"
                borderRadius="full"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                colorScheme="blue"
                borderRadius="full"
                marginTop="16px"
                onClick={handleCreate}
              >
                Create New Board
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};