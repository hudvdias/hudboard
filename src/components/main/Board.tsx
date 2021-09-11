import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useBoard } from "../../hooks/useBoard";
import { IStatus } from "../../types/IBoard";
import { Column } from "./Column";

export function Board() {
  const [statuses, setStatuses] = useState<IStatus[]>([]);

  const { board, updateStatuses } = useBoard();

  useEffect(() => {
    setStatuses(board.statuses);
  }, [board]);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) return;
    const startStatus = statuses.find((status) => status.id === result.source.droppableId);
    const endStatus = statuses.find((status) => status.id === result.destination?.droppableId);
    if (!startStatus || !endStatus) return;
    if (startStatus === endStatus) {
      const [myCard] = startStatus.cards.splice(result.source.index, 1);
      startStatus.cards.splice(result.destination.index, 0, myCard);
      const newStatuses = statuses.map((status) => {
        if (status.id === startStatus.id) return startStatus;
        return status;
      });
      updateStatuses(newStatuses);
    } else {
      const [myCard] = startStatus.cards.splice(result.source.index, 1);
      myCard.statusId = endStatus.id;
      endStatus.cards.splice(result.destination.index, 0, myCard);
      const newStatuses = statuses.map((status) => {
        if (status.id === startStatus.id) return startStatus;
        if (status.id === endStatus.id) return endStatus;
        return status;
      });
      updateStatuses(newStatuses);
    };
  };

  return (
    <Grid
      width="100%"
      height="100%"
      templateColumns="260px 280px 280px 300px 280px"
      paddingX="24px"
      gap="24px"
    >
      <DragDropContext
        onDragEnd={(result) => handleOnDragEnd(result)}
      >
        {statuses.map((status) => (
          <Column
            status={status}
            key={status.id}
          />
        ))}
      </DragDropContext>
    </Grid>
  );
};