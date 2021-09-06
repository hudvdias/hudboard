import { Button, Flex, Heading } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      height="104px"
      minHeight="104px"
      width="100%"
      paddingX="24px"
      alignItems="center"
    >
      <Heading>
        Board
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