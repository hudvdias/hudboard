import { Flex, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { ICard, IStatus } from "../../types/IBoard";
import { ColumnHeader } from "../ui/ColumnHeader";
import { Card } from "./Card";

interface IColumnProps {
  status: IStatus,
}

export function Column({ status }: IColumnProps) {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    setCards(status.cards);
  }, [status]);

  return (
    <Flex
      flexDirection="column"
    >
      <ColumnHeader status={status} />
      <Stack
        marginTop="16px"
        spacing="16px"
        height="100%"
      >
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
          />
        ))}
      </Stack>
    </Flex>
  );
};