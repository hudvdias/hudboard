import { Flex, Tag, Text } from "@chakra-ui/react";
import { IStatus } from "../../types/IBoard";

interface IColumnHeaderProps {
  status: IStatus,
}

export function ColumnHeader({ status }: IColumnHeaderProps) {
  return (
    <Flex
      height="40px"
      paddingX="16px"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="md"
      background={`${status.color}.500`}
      dropShadow="lg"
    >
      <Text
        fontSize="14px"
        fontWeight="600"
        textTransform="capitalize"
      >
        {status.title}
      </Text>
      <Tag
        size="sm"
      >
        {status.cardsIds.length}
      </Tag>
    </Flex>
  );
};