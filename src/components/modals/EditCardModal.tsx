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

export function EditCardModal() {
  const [card, setCard] = useState({} as ICard);
  const [cardTasks, setCardTasks] = useState<ITask[]>([]);
  const [titleError, setTitleError] = useState(false);

  const { isEditCardModalOpen, toggleEditCardModal, editCardId } = useModal();
  const { statuses, cards, tasks, editCard, deleteCard } = useBoard();

  useEffect(() => {
    const myCard = cards.find((card) => {
      return card.id === editCardId;
    });
    const myTasks = tasks.filter((task) => {
      return task.cardId === editCardId;
    });
    if (!myCard) return;
    setCard(myCard);
    setCardTasks(myTasks);
  }, [cards, tasks, editCardId]);

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
    const newTasks = [...cardTasks, newTask];
    setCardTasks(newTasks);
    const newCard = {
      ...card,
      cardsIds: card.tasksIds.push(newTask.id),
    };
    setCard(newCard);
  };

  function handleRemoveTask(id: string) {
    const newTasks = cardTasks.filter((task) => {
      return task.id !== id;
    });
    setCardTasks(newTasks);
  };

  function handleEditTask({ id, title, isDone }: IEditTaskProps) {
    const myTask = cardTasks.find((task) => {
      return task.id === id;
    });
    if (!myTask) return;
    const newTask = {
      ...myTask,
      title: title ? title : myTask.title,
      isDone: isDone ? isDone : myTask.isDone,
    };
    const newTasks = cardTasks.map((task) => {
      if (task.id === id) {
        return newTask;
      };
      return task;
    });
    setCardTasks(newTasks);
  };

  function resetModal() {
    setCard({} as ICard);
    setCardTasks([]);
  };

  function handleSubmit() {
    if (!card.title) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    editCard(card, cardTasks);
    resetModal();
    toggleEditCardModal();
    return;
  };

  function handleDeleteCard() {
    deleteCard(card.id);
    resetModal();
    toggleEditCardModal();
    return;
  };

  return (
    <Modal
      isOpen={isEditCardModalOpen}
      onClose={() => toggleEditCardModal()}
      size="4xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        as="form"
      >
        <ModalHeader>
          Edit Card
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
                marginBottom={cardTasks.length > 0 ? '16px' : '0'}
              >
                {cardTasks.map((task) => (
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
            colorScheme="red"
            onClick={() => handleDeleteCard()}
            marginRight="16px"
          >
            Delete
          </Button>
          <Button
            colorScheme="green"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};