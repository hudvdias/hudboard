import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";

import { useBoard } from "../../hooks/useBoard";
import { useModal } from "../../hooks/useModal";

export function Header() {
  const { board } = useBoard();
  const { toggleCardModal } = useModal();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  if (!board.id) return (
    <></>
  );

  return (
    <Flex
      height="104px"
      minHeight="104px"
      width="100%"
      paddingX="24px"
      alignItems="center"
      justifyContent={isWideVersion ? 'left' : 'space-between'}
    >
      <Heading>
        {board.name}
      </Heading>
      {isWideVersion ? (
        <Button
          marginLeft="24px"
          size="sm"
          colorScheme="blue"
          onClick={() => toggleCardModal()}
        >
          + Add Card
        </Button>
      ) : (
        <IconButton
          aria-label="Add Card"
          icon={<AddIcon />}
          colorScheme="blue"
          size="sm"
          onClick={() => toggleCardModal()}
        />
      )}
    </Flex>
  );
};