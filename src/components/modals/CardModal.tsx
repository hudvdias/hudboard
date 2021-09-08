import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Grid, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { ICard, ITask } from "../../types/IBoard";

interface IEditCardProps {
  title?: string,
  statusId?: string,
};

interface IEditTaskProps {
  id: string,
  title?: string,
  isDone?: boolean,
};

export function CardModal() {
  const [card, setCard] = useState({} as ICard);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [titleError, setTitleError] = useState(false);

  const { isCardModalOpen, toggleModal } = useModal();
  const { statuses, createCard } = useBoard();

  useEffect(() => {
    const newCard = {
      id: v4(),
      title: '',
      statusId: statuses[0]?.id,
      tasksIds: [],
    }
    setCard(newCard);
  }, [statuses]);

  function handleEditCard({ title, statusId }: IEditCardProps) {
    const newCard = {
      ...card,
      title: title ? title : card.title,
      statusId: statusId ? statusId : card.statusId,
    };
    setCard(newCard);
  };

  function handleAddTask() {
    const newTask = {
      id: v4(),
      cardId: card.id,
      title: '',
      isDone: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    const newCard = {
      ...card,
      cardsIds: card.tasksIds.push(newTask.id),
    };
    setCard(newCard);
  };

  function handleRemoveTask(id: string) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  };

  function handleEditTask({ id, title, isDone }: IEditTaskProps) {
    const myTask = tasks.find((task) => {
      return task.id === id;
    });
    if (!myTask) return;
    const newTask = {
      ...myTask,
      title: title ? title : myTask.title,
      isDone: isDone ? isDone : myTask.isDone,
    };
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return newTask;
      };
      return task;
    });
    setTasks(newTasks);
  };

  function resetModal() {
    const newCard = {
      id: v4(),
      title: '',
      statusId: statuses[0]?.id,
      tasksIds: [],
    }
    setCard(newCard);
    setTasks([]);
  };

  function handleCreateCard() {
    if (!card.title) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    createCard(card, tasks);
    resetModal();
    toggleModal({ modal: 'card' });
    return;
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
                isInvalid={titleError}
              >
                <FormLabel>
                  Title
                </FormLabel>
                <Input
                  placeholder="Card Title"
                  variant="filled"
                  autoFocus
                  value={card.title}
                  onChange={(event) => handleEditCard({ title: event.target.value })}
                />
                <FormErrorMessage>
                  Card needs a title.
                </FormErrorMessage>
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
                  value={card.statusId}
                  onChange={(event) => handleEditCard({ statusId: event.currentTarget.value })}
                >
                  {statuses.map((status) => (
                    <option
                      value={status.id}
                      key={status.id}
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
                    key={task.id}
                  >
                    <Checkbox
                      colorScheme="green"
                      isChecked={task.isDone}
                      onChange={() => handleEditTask({ id: task.id, isDone: !task.isDone })}
                    />
                    <Input
                      variant="filled"
                      placeholder="Task"
                      size="sm"
                      value={task.title}
                      onChange={(event) => handleEditTask({ id: task.id, title: event.target.value })}
                    />
                    <IconButton
                      size="xs"
                      aria-label="Remove Task"
                      icon={<DeleteIcon />}
                      onClick={() => handleRemoveTask(task.id)}
                    />
                  </HStack>
                ))}
              </Stack>
              <Button
                size="sm"
                onClick={() => handleAddTask()}
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