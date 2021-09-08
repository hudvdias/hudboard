import { Grid } from "@chakra-ui/react";
import { useBoard } from "../../hooks/useBoard";
import { Column } from "./Column";

export function Board() {
  const { statuses } = useBoard();

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