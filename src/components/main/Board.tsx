import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useBoard } from "../../hooks/useBoard";
import { IStatus } from "../../types/IBoard";
import { Column } from "./Column";

export function Board() {
  const [statuses, setStatuses] = useState<IStatus[]>([]);

  const { board } = useBoard();

  useEffect(() => {
    setStatuses(board.statuses);
  }, [board]);

  return (
    <Grid
      width="100%"
      height="100%"
      templateColumns="260px 280px 280px 300px 280px"
      paddingX="24px"
      gap="24px"
    >
      {statuses.map((status) => (
        <Column
          status={status}
          key={status.id}
        />
      ))}
    </Grid>
  );
};