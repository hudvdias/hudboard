import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Checkbox, FormControl, FormLabel, Grid, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { ICard, ITask } from "../../types/IBoard";

export function CardModal() {
  const [card, setCard] = useState({} as ICard);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { isCardModalOpen, toggleModal } = useModal();
  const { statuses } = useBoard();

  useEffect(() => {
    const newCard = {
      id: v4(),
      title: '',
      statusId: statuses[0].id,
      tasksIds: [],
    }
    setCard(newCard);
  }, [statuses]);

  function handleCreateCard() {
    console.log(card);
  };

  return (
    <Modal
      isOpen={isCardModalOpen}
      onClose={() => toggleModal({ modal: 'card' })}
      size="4xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        as="form"
      >
        <ModalHeader>
          Create Card
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns="3fr 4fr"
            gap="32px"
          >
            <Stack
              spacing="24px"
            >
              <FormControl
                isRequired
              >
                <FormLabel>
                  Title
                </FormLabel>
                <Input
                  placeholder="Card Title"
                  variant="filled"
                  autoFocus
                />
              </FormControl>
              <FormControl
                isRequired
              >
                <FormLabel>
                  Status
                </FormLabel>
                <Select
                  variant="filled"
                  textTransform="capitalize"
                >
                  {statuses.map((status) => (
                    <option
                      value={status.id}
                    >
                      {status.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>
                Tasks
              </FormLabel>
              <Stack
                marginBottom={tasks.length > 0 ? '16px' : '0'}
              >
                {tasks.map((task) => (
                  <HStack
                    spacing="8px"
                  >
                    <Checkbox
                      colorScheme="green"
                    />
                    <Input
                      variant="filled"
                      placeholder="Task"
                      size="sm"
                    />
                    <IconButton
                      size="xs"
                      aria-label="Add Subtask"
                      icon={<AddIcon />}
                      onClick={() => {}}
                    />
                    <IconButton
                      size="xs"
                      aria-label="Remove Task"
                      icon={<DeleteIcon />}
                      onClick={() => {}}
                    />
                  </HStack>
                ))}
              </Stack>
              <Button
                size="sm"
                onClick={() => {}}
              >
                + Add Task
              </Button>
            </FormControl>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => handleCreateCard()}
          >
            Create Card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};