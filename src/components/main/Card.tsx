import { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Checkbox, Flex, IconButton, Stack, Text } from "@chakra-ui/react";

import { ICard, ITask } from "../../types/IBoard";
import { EditIcon } from "@chakra-ui/icons";

interface ICardProps {
  card: ICard,
};

export function Card({ card }: ICardProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setTasks(card.tasks);
  }, [card]);

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
            padding="16px"
          >
            <Text
              width="100%"
              textAlign="left"
            >
              {card.title}
            </Text>
            <AccordionIcon />
          </AccordionButton>
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
                  onChange={() => {}}
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
              onClick={() => {}}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};