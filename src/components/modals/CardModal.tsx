import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Flex, FormControl, FormLabel, Grid, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { v4 } from "uuid";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { ISubtask, ITask } from "../../types/IBoard";

export function CardModal() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [subtasks, setSubtasks] = useState<ISubtask[]>([]);

  const { isCardModalOpen, toggleModal } = useModal();
  const { statuses } = useBoard();

  function handleAddTask() {
    const newTask = {
      id: v4(),
      cardId: '',
      title: '',
      completed: false,
      subtasksIds: [],
    };
    setTasks([ ...tasks, newTask ]);
  };

  function handleRemoveTask(id: string) {
    const myTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(myTasks);
  };

  function handleAddSubtask(taskId: string) {
    const newSubtask = {
      id: v4(),
      taskId: taskId,
      title: '',
      completed: false,
    };
    setSubtasks([ ...subtasks, newSubtask ]);
  };

  function handleRemoveSubtask(id: string) {
    const mySubtasks = subtasks.filter((subtask) => {
      return subtask.id !== id;
    });
    setSubtasks(mySubtasks);
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
              <FormControl>
                <FormLabel>
                  Notes
                </FormLabel>
                <Textarea
                  placeholder="Insert notes if you want..."
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Link
                </FormLabel>
                <Input
                  placeholder="http://www.notion.so"
                  variant="filled"
                  type="url"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Deadline
                </FormLabel>
                <Input
                  placeholder="Ex: 20/06/2022"
                  variant="filled"
                  type="date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Frequency
                </FormLabel>
                <Select
                  variant="filled"
                  textTransform="capitalize"
                >
                  <option>
                    none
                  </option>
                  <option
                    value="daily"
                  >
                    daily
                  </option>
                  <option
                    value="weekly"
                  >
                    weekly
                  </option>
                  <option
                    value="monthly"
                  >
                    monthly
                  </option>
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
                  <Flex
                    flexDirection="column"
                    key={task.id}
                  >
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
                        onClick={() => handleAddSubtask(task.id)}
                      />
                      <IconButton
                        size="xs"
                        aria-label="Remove Task"
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveTask(task.id)}
                      />
                    </HStack>
                    <Stack
                      spacing="8px"
                      marginLeft="24px"
                    >
                      {subtasks.map((subtask) => subtask.taskId === task.id && (
                        <HStack
                          key={subtask.id}
                          spacing="8px"
                          _first={{ marginTop: '8px' }}
                          _last={{ marginBottom: '8px' }}
                        >
                          <Checkbox
                            size="sm"
                          />
                          <Input
                            variant="flushed"
                            placeholder="Task"
                            size="xs"
                          />
                          <IconButton
                            size="xs"
                            aria-label="Remove Task"
                            icon={<DeleteIcon />}
                            onClick={() => handleRemoveSubtask(subtask.id)}
                          />
                        </HStack>
                      ))}
                    </Stack>
                  </Flex>
                ))}
              </Stack>
              <Button
                size="sm"
                onClick={handleAddTask}
              >
                + Add Task
              </Button>
            </FormControl>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
          >
            Create Card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};