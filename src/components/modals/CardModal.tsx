import { useEffect,useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack, 
  Text, 
  useToast}
from "@chakra-ui/react";
import { v4 } from "uuid";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { ICard, ITask } from "../../types/IBoard";
import { TaskInput } from "../ui/TaskInput";
import { DeleteCardAlert } from "../ui/DeleteCardAlert";
import { DeleteIcon } from "@chakra-ui/icons";

export function CreateCardModal() {
  const [title, setTitle] = useState('');
  const [statusId, setStatusId] = useState('1');
  const [icon, setIcon] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [shownEmojiPicker, setShownEmojiPicker] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { isCardModalOpen, toggleCardModal, toggleDeleteCardAlert } = useModal();
  const { board, createCard, updateCard, editCard, setEditCard } = useBoard();
  const toast = useToast();

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

  async function handleSubmitCreateCard() {
    setCreateLoading(true);
    if (!title) {
      setTitleError(true);
      setCreateLoading(false);
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
    try {
      await createCard(newCard);
      toast({
        status: 'success',
        description: 'Your card has been created.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
      handleCloseModal();
    } catch (error) {
      toast({
        status: 'error',
        title: 'Could not create card.',
        description: 'Try again later or verify your connection.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
    }
    setCreateLoading(false);
  };

  async function handleSubmitUpdateCard() {
    if (!editCard) return;
    if (!title) {
      setTitleError(true);
      return;
    };
    setTitleError(false);
    setUpdateLoading(true);
    const myTasks = tasks.filter((task) => task.title !== '');
    const newCard: ICard = {
      id: editCard.id,
      title,
      statusId,
      icon,
      tasks: myTasks,
    };
    try {
      await updateCard(newCard);
      toast({
        status: 'success',
        description: 'Your card has been updated.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
      handleCloseModal();
    } catch (error) {
      toast({
        status: 'error',
        title: 'Could not update card.',
        description: 'Try again later or verify your connection.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
    }
    setUpdateLoading(false);
  };

  function handleSubmitDeleteCard() {
    if (!editCard) return;
    toggleDeleteCardAlert();
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
                <Flex
                  alignItems="center"
                >
                  {icon ? (
                    <Text
                      fontSize="4xl"
                    >
                      {icon}
                    </Text>
                  ) : (
                    <Text
                      color="gray.500"
                      fontSize="sm"
                    >
                      No icon.
                    </Text>
                  )}
                  <Flex
                    marginLeft="auto"
                    alignItems="center"
                  >
                    <Button
                      size="sm"
                      onClick={() => setShownEmojiPicker(!shownEmojiPicker)}
                    >
                      {icon ? (
                        'Change'
                      ) : (
                        'Chose Icon'
                      )}
                    </Button>
                    {icon && (
                      <IconButton
                        aria-label="Remove Icon"
                        size="sm"
                        marginLeft="8px"
                        icon={<DeleteIcon />}
                        onClick={() => setIcon('')}
                      />
                    )}
                  </Flex>
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
              isLoading={updateLoading}
            >
              Save
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleSubmitCreateCard()}
              isLoading={createLoading}
            >
              Create Card
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
      {editCard && (
        <DeleteCardAlert
          cardId={editCard.id}
        />
      )}
    </Modal>
  );
};