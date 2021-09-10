import { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, IconButton, Stack, Text } from "@chakra-ui/react";

import { ICard, ITask } from "../../types/IBoard";
import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";
import { Draggable } from "react-beautiful-dnd";

interface ICardProps {
  card: ICard,
  index: number,
};

export function Card({ card, index }: ICardProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { setEditCard, toggleTask } = useBoard();
  const { toggleCardModal } = useModal();

  useEffect(() => {
    setTasks(card.tasks);
  }, [card]);

  function handleEditCard() {
    setEditCard(card);
    toggleCardModal();
  };

  return (
    <Draggable
      draggableId={card.id}
      index={index}
    >
      {(cardProvided) => (
        <Flex
          flexDirection="column"
          width="100%"
          background="gray.700"
          borderRadius="lg"
          ref={cardProvided.innerRef}
          {...cardProvided.draggableProps}
          {...cardProvided.dragHandleProps}
        >
          <Accordion
            allowToggle
          >
            <AccordionItem
              border="none"
            >
              <Flex
                alignItems="center"
                paddingX="8px"
                >
                <DragHandleIcon
                  marginRight="8px"
                  boxSize="12px"
                  color="gray.600"
                />
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingY="16px"
                  paddingX="0"
                >
                  <Text
                    width="100%"
                    textAlign="left"
                  >
                    {card.title}
                  </Text>
                  <AccordionIcon
                    color="gray.600"
                  />
                </AccordionButton>
              </Flex>
              <AccordionPanel>
                <Stack
                  spacing="0"
                  marginBottom={tasks.length > 0 ? '16px' : '0'}
                >
                  {tasks.map((task) => (
                    <Checkbox
                      key={task.id}
                      colorScheme="green"
                      size="sm"
                      isChecked={task.isDone}
                      onChange={() => toggleTask(task.id)}
                      textColor={task.isDone ? 'gray.500' : ''}
                      textDecoration={task.isDone ? 'line-through' : ''}
                      fontStyle={task.isDone ? 'italic' : ''}
                    >
                      {task.title}
                    </Checkbox>
                  ))}
                </Stack>
                <IconButton
                  aria-label="Edit Card"
                  icon={<EditIcon />}
                  size="xs"
                  onClick={() => handleEditCard()}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      )}
    </Draggable>
  );
};