import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { ICard, ITask } from "../../types/IBoard";
import { TaskInput } from "../ui/TaskInput";

export function CreateCardModal() {
  const [title, setTitle] = useState('');
  const [statusId, setStatusId] = useState('1');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [titleError, setTitleError] = useState(false);

  const { isCardModalOpen, toggleCardModal } = useModal();
  const { board, createCard, updateCard, deleteCard, editCard, setEditCard } = useBoard();

  useEffect(() => {
    if (editCard) {
      setTitle(editCard.title);
      setStatusId(editCard.statusId);
      setTasks(editCard.tasks);
    }
  }, [editCard]);

  function handleAddTask() {
    const newTask = {
      id: v4(),
      title: '',
      isDone: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  function handleUpdateTask(newTask: ITask) {
    const newTasks = tasks.map((task) => {
      if (task.id === newTask.id) return newTask;
      else return task;
    });
    setTasks(newTasks);
  };

  function handleRemoveTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  function handleCloseModal() {
    setEditCard();
    setTitle('');
    setStatusId('1');
    setTasks([]);
    toggleCardModal();
  };

  function handleSubmitCreateCard() {
    if (!title) {
      setTitleError(true);
      return;
    };
    setTitleError(false);
    const myTasks = tasks.filter((task) => task.title !== '');
    const newCard: ICard = {
      id: v4(),
      title,
      statusId,
      tasks: myTasks,
    }
    createCard(newCard);
    handleCloseModal();
  };

  function handleSubmitUpdateTask() {
    if (!editCard) return;
    if (!title) {
      setTitleError(true);
      return;
    };
    setTitleError(false);
    const myTasks = tasks.filter((task) => task.title !== '');
    const newCard: ICard = {
      id: editCard.id,
      title,
      statusId,
      tasks: myTasks,
    };
    updateCard(newCard);
    handleCloseModal();
  };

  function handleSubmitDeleteCard() {
    if (!editCard) return;
    deleteCard(editCard.id);
    handleCloseModal();
  };

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const myTasks = tasks;
    const [myTask] = myTasks.splice(result.source.index, 1);
    myTasks.splice(result.destination.index, 0, myTask);
    setTasks(myTasks);
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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
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
                  value={statusId}
                  onChange={(event) => setStatusId(event.currentTarget.value)}
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
              <DragDropContext
                onDragEnd={(result) =>handleOnDragEnd(result)}
              >
                <Droppable
                  droppableId={'cardModalTasks'}
                >
                  {(droppableProvided) => (
                    <Stack
                      marginBottom={tasks.length > 0 ? '16px' : '0'}
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {tasks.map((task, index) => (
                        <TaskInput
                          key={task.id}
                          task={task}
                          index={index}
                          updateTask={handleUpdateTask}
                          removeTask={handleRemoveTask}
                        />
                      ))}
                      {droppableProvided.placeholder}
                    </Stack>
                  )}
                </Droppable>
              </DragDropContext>
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
              onClick={() => handleSubmitUpdateTask()}
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