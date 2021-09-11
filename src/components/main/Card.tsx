import { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, IconButton, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { DragHandleIcon, EditIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";

import { ICard, ITask } from "../../types/IBoard";
import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";

interface ICardProps {
  card: ICard,
  index: number,
};

export function Card({ card, index }: ICardProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskCounter, setTaskCounter] = useState({ done: 0, total: 0 });

  const [taskToggleLoading, setTaskToggleLoading] = useState(false);

  const { setEditCard, toggleTask } = useBoard();
  const { toggleCardModal } = useModal();
  const toast = useToast();

  useEffect(() => {
    setTasks(card.tasks);
    setTaskCounter({
      done: card.tasks.filter(task => task.isDone === true).length,
      total: card.tasks.length,
    });
  }, [card]);

  function handleEditCard() {
    setEditCard(card);
    toggleCardModal();
  };

  async function handleToggleTask(id: string) {
    setTaskToggleLoading(true);
    try {
      await toggleTask(id);
    } catch (error) {
      toast({
        status: 'error',
        title: 'Could not update task.',
        description: 'Try again later or verify your connection.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
    };
    setTaskToggleLoading(false);
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
            allowToggle={card.statusId === '4' ? false : true}
            defaultIndex={card.statusId === '4' ? 0 : undefined}
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
                  <Flex
                    alignItems="center"
                  >
                    {card.icon && (
                      <Text
                        marginRight="8px"
                      >
                        {card.icon}
                      </Text>
                    )}
                    <Text
                      textAlign="left"
                    >
                      {card.title}
                    </Text>
                    {card.tasks.length > 0 && (
                      <Text
                        fontSize="xs"
                        color={taskCounter.done === taskCounter.total ? "green.600" : "gray.500"}
                        marginLeft="16px"
                        marginRight="8px"
                        lineHeight={1}
                      >
                        {taskCounter.done}/{taskCounter.total}
                      </Text>
                    )}
                  </Flex>
                  <AccordionIcon
                    color="gray.600"
                    display={card.statusId === '4' ? 'none' : ''}
                  />
                </AccordionButton>
              </Flex>
              <AccordionPanel>
                <Stack
                  position="relative"
                  spacing="0"
                  marginBottom={tasks.length > 0 ? '16px' : '0'}
                >
                  {taskToggleLoading && (
                    <Flex
                      position="absolute"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      height="100%"
                    >
                      <Spinner size="lg" />
                    </Flex>
                  )}
                  {tasks.map((task) => (
                    <Checkbox
                      key={task.id}
                      colorScheme="green"
                      size="sm"
                      isChecked={task.isDone}
                      onChange={() => handleToggleTask(task.id)}
                      textColor={task.isDone ? 'gray.500' : ''}
                      textDecoration={task.isDone ? 'line-through' : ''}
                      fontStyle={task.isDone ? 'italic' : ''}
                      opacity={taskToggleLoading ? '0.25' : ''}
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