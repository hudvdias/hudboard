import { useState } from "react";
import { Button, Divider, Flex, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalOverlay, useToast } from "@chakra-ui/react";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";

export function StartModal() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const { isStartModalOpen, toggleStartModal, toggleCreateBoardAlert } = useModal();
  const { createBoard, loadBoard } = useBoard();
  const toast = useToast();

  async function handleCreate() {
    if (!name) {
      setNameError(true);
      return;
    };
    setNameError(false);
    setCreateLoading(true);
    const myBoardId = await createBoard(name);
    if (myBoardId) {
      toggleCreateBoardAlert();
      toggleStartModal();
    };
    setCreateLoading(false);
  };

  async function handleLoad() {
    if (!id) {
      setIdError(true);
      return;
    };
    setIdError(false);
    setLoading(true);
    const myBoardId = await loadBoard(id);
    if (myBoardId) {
      toggleStartModal();
      toast({
        title: 'Success',
        description: 'Board loaded successfully!',
        isClosable: true,
        position: 'top',
        status: 'success',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Board not found.',
        isClosable: true,
        position: 'top',
        status: 'error',
      });
    };
    setLoading(false);
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
        paddingTop="48px"
        paddingBottom="64px"
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
              <FormControl
                isInvalid={idError}
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
                <FormErrorMessage
                  justifyContent="center"
                >
                  <FormErrorIcon />
                  Insert a ID.
                </FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="blue"
                borderRadius="full"
                marginTop="16px"
                onClick={() => handleLoad()}
                isLoading={loading}
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
              <FormControl
                isInvalid={nameError}
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
                <FormErrorMessage
                  justifyContent="center"
                >
                  <FormErrorIcon />
                  Your board needs a name.
                </FormErrorMessage>

              </FormControl>
              <Button
                colorScheme="green"
                borderRadius="full"
                marginTop="16px"
                onClick={handleCreate}
                isLoading={createLoading}
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