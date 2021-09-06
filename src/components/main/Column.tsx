import { Flex } from "@chakra-ui/react";
import { ColumnHeader } from "../ui/ColumnHeader";

export function Column() {
  return (
    <Flex
      flexDirection="column"
    >
      <ColumnHeader />
    </Flex>
  );
};