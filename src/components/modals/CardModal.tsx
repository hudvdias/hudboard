import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text } from "@chakra-ui/react";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
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
  const [icon, setIcon] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [shownEmojiPicker, setShownEmojiPicker] = useState(false);

  const { isCardModalOpen, toggleCardModal } = useModal();
  const { board, createCard, updateCard, deleteCard, editCard, setEditCard } = useBoard();

  useEffect(() => {
    if (editCard) {
      setTitle(editCard.title);
      setStatusId(editCard.statusId);
      setIcon(editCard.icon);
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
    setIcon('');
    setTasks([]);
    setTitleError(false);
    setShownEmojiPicker(false);
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
      icon,
      tasks: myTasks,
    }
    createCard(newCard);
    handleCloseModal();
  };

  function handleSubmitUpdateCard() {
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
      icon,
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

  function handleOnEmojiClick(emojiObject: IEmojiData) {
    setIcon(emojiObject.emoji);
    setShownEmojiPicker(false);
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
              <FormControl>
                <FormLabel>
                  Icon
                </FormLabel>
                <Text
                  color="gray.500"
                  marginBottom="16px"
                >
                  {icon ? (
                    icon
                  ) : (
                    'No icon.'
                  )}
                </Text>
                <Flex>
                  <Button
                    size="sm"
                    onClick={() => setShownEmojiPicker(!shownEmojiPicker)}
                  >
                    {icon ? (
                      'Change Icon'
                    ) : (
                      'Chose Icon'
                    )}
                  </Button>
                  {icon && (
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => setIcon('')}
                      marginLeft="8px"
                    >
                      Remove Icon
                    </Button>
                  )}
                </Flex>
                {shownEmojiPicker && (
                  <EmojiPicker
                    onEmojiClick={(event, emojiObject) => handleOnEmojiClick(emojiObject)}
                    native
                    pickerStyle={{
                      position: 'absolute',
                      marginTop: '8px',
                      boxShadow: 'none',
                      color: 'black',
                    }}
                  />
                )}
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
              onClick={() => handleSubmitUpdateCard()}
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