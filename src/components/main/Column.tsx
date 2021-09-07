import { Flex } from "@chakra-ui/react";
import { IStatus } from "../../types/IBoard";
import { ColumnHeader } from "../ui/ColumnHeader";

interface IColumnProps {
  status: IStatus,
}

export function Column({ status }: IColumnProps) {
  return (
    <Flex
      flexDirection="column"
    >
      <ColumnHeader status={status} />
    </Flex>
  );
};