import { Flex, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useBoard } from "../../hooks/useBoard";
import { ICard, IStatus } from "../../types/IBoard";
import { ColumnHeader } from "../ui/ColumnHeader";
import { Card } from "./Card";

interface IColumnProps {
  status: IStatus,
}

export function Column({ status }: IColumnProps) {
  const [statusCards, setStatusCards] = useState<ICard[]>([]);

  const { cards } = useBoard();

  useEffect(() => {
    const myCards = cards.filter((card) => {
      return card.statusId === status.id;
    });
    setStatusCards(myCards);
  }, [cards, status]);

  return (
    <Flex
      flexDirection="column"
    >
      <ColumnHeader status={status} />
      <Stack
        marginTop="16px"
        spacing="16px"
      >
        {statusCards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </Stack>
    </Flex>
  );
};