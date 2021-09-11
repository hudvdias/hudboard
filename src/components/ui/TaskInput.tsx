import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, HStack, IconButton, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { ITask } from "../../types/IBoard";

interface ITaskInputProps {
  task: ITask,
  updateTask: (task: ITask) => void,
  removeTask: (id: string) => void,
};

export function TaskInput({ task, updateTask, removeTask }: ITaskInputProps) {
  const [title, setTitle] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setTitle(task.title);
    setIsDone(task.isDone);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newTask: ITask = {
      id: task.id,
      title: title,
      isDone: isDone,
    };
    updateTask(newTask);
    // eslint-disable-next-line
  }, [title, isDone]);

  return (
    <HStack
      spacing="8px"
    >
      <Checkbox
        colorScheme="green"
        isChecked={isDone}
        onChange={() => setIsDone(!isDone)}
      />
      <Input
        variant="filled"
        placeholder="Task"
        size="sm"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        fontStyle={isDone ? 'italic' : ''}
        color={isDone ? 'gray.500' : ''}
        textDecoration={isDone ? 'line-through' : ''}
      />
      <IconButton
        size="xs"
        aria-label="Remove Task"
        icon={<DeleteIcon />}
        onClick={() => removeTask(task.id)}
      />
    </HStack>
  );
};