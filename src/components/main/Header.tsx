import { Button, Flex, Heading } from "@chakra-ui/react";
import { useBoard } from "../../hooks/useBoard";

export function Header() {
  const { board } = useBoard();

  return (
    <Flex
      height="104px"
      minHeight="104px"
      width="100%"
      paddingX="24px"
      alignItems="center"
    >
      <Heading>
        {board.name}
      </Heading>
      <Button
        marginLeft="24px"
        size="sm"
        colorScheme="blue"
      >
        + Add Card
      </Button>
    </Flex>
  );
};