import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Grid, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";

import { emptyCard } from "../../data/initialData";
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

export function CreateCardModal() {
  const [card, setCard] = useState<ICard>(emptyCard);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [titleError, setTitleError] = useState(false);

  const { isCardModalOpen, toggleCardModal } = useModal();
  const { board, createCard, updateCard, deleteCard, editCard, setEditCard } = useBoard();

  useEffect(() => {
    if (editCard) {
      setCard(editCard);
      setTasks(editCard.tasks);
    };
  }, [editCard]);

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
      title: '',
      isDone: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  function handleRemoveTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  function handleEditTask({ id, title, isDone }: IEditTaskProps) {
    const myTask = tasks.find((task) => task.id === id);
    if (!myTask) return;
    const newTask = {
      ...myTask,
      title: title ? title : myTask.title,
      isDone: isDone ? isDone : myTask.isDone,
    };
    const newTasks = tasks.map((task) => {
      if (task.id === id) return newTask;
      else return task;
    });
    setTasks(newTasks);
  };

  function handleCloseModal() {
    setEditCard();
    setCard(emptyCard);
    setTasks([]);
    toggleCardModal();
  };

  function handleSubmitCreateCard() {
    if (!card.title) {
      setTitleError(true);
      return;
    };
    setTitleError(false);
    const newCard = {
      ...card,
      id: v4(),
      tasks,
    }
    createCard(newCard);
    handleCloseModal();
  };

  function handleSubmitEditCard() {
    if (!card.title) {
      setTitleError(true);
      return;
    };
    setTitleError(false);
    const newCard = {
      ...card,
      tasks,
    };
    updateCard(newCard);
    handleCloseModal();
  };

  function handleSubmitDeleteCard() {
    deleteCard(card.id);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={isCardModalOpen}
      onClose={() => handleCloseModal()}
      size="4xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        as="form"
      >
        <ModalHeader>
          {editCard ? 'Edit Card' : 'Create Card'}
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
                  {board.statuses.map((status) => (
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
        {editCard ? (
          <ModalFooter>
            <Button
              colorScheme="red"
              marginRight="16px"
              onClick={() => handleSubmitDeleteCard()}
            >
              Delete
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handleSubmitEditCard()}
            >
              Save
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleSubmitCreateCard()}
            >
              Create Card
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};