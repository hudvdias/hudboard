import { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, IconButton, Stack, Text } from "@chakra-ui/react";

import { useBoard } from "../../hooks/useBoard";
import { ICard, ITask } from "../../types/IBoard";
import { EditIcon } from "@chakra-ui/icons";
import { useModal } from "../../hooks/useModal";

interface ICardProps {
  card: ICard,
};

export function Card({ card }: ICardProps) {
  const [cardTasks, setCardTasks] = useState<ITask[]>([]);

  const { tasks, toggleTask } = useBoard();
  const { toggleEditCardModal } = useModal();

  useEffect(() => {
    const myTasks = tasks.filter((task) => {
      return task.cardId === card.id;
    });
    setCardTasks(myTasks);
  }, [tasks, card]);

  return (
    <Flex
      flexDirection="column"
      width="100%"
      background="gray.700"
      borderRadius="lg"
    >
      <Accordion
        allowToggle
      >
        <AccordionItem
          border="none"
        >
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="48px"
          >
            <Text>
              {card.title}
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Stack
              spacing="0"
            >
              {cardTasks.map((task) => (
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
              marginTop="16px"
              onClick={() => toggleEditCardModal(card.id)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};