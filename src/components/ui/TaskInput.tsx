import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Checkbox, HStack, IconButton, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../types/IBoard";

interface ITaskInputProps {
  task: ITask,
  index: number,
  updateTask: (task: ITask) => void,
  removeTask: (id: string) => void,
};

export function TaskInput({ task, index, updateTask, removeTask }: ITaskInputProps) {
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
    <Draggable
     draggableId={task.id}
     index={index}
    >
      {(DraggableProvided) => (
        <HStack
          spacing="8px"
          {...DraggableProvided.draggableProps}
          {...DraggableProvided.dragHandleProps}
          ref={DraggableProvided.innerRef}
        >
          <DragHandleIcon
            boxSize="12px"
            color="gray.600"
          />
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
      )}
    </Draggable>
  );
};