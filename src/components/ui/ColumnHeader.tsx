import { Flex, Tag, Text } from "@chakra-ui/react";

export function ColumnHeader() {
  return (
    <Flex
      height="40px"
      paddingX="16px"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="md"
      background="gray.500"
      dropShadow="lg"
    >
      <Text
        fontSize="14px"
        fontWeight="600"
      >
        Status
      </Text>
      <Tag
        size="sm"
      >
        2
      </Tag>
    </Flex>
  );
};