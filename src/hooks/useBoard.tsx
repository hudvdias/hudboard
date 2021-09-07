import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";
import { IBoard, IStatus } from "../types/IBoard";
import { IProviderProps } from "./AppProvider";

interface IBoardContextProps {
  board: IBoard,
  statuses: IStatus[],
  createBoard: (name: string) => void;
};

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

const initialStatuses = [
  {
    title: 'draft',
    color: 'gray',
    step: 1,
  },
  {
    title: 'ready',
    color: 'yellow',
    step: 2,
  },
  {
    title: 'pending',
    color: 'orange',
    step: 3,
  },
  {
    title: 'in progress',
    color: 'red',
    step: 4,
  },
  {
    title: 'completed',
    color: 'green',
    step: 5,
  },
];

export function BoardProvider({ children }: IProviderProps) {
  const [board, setBoard] = useState<IBoard>({} as IBoard);
  const [statuses, setStatuses] = useState<IStatus[]>([]);

  useEffect(() => {
    const localBoard = localStorage.getItem('@hudboard:board');
    const localStatuses = localStorage.getItem('@hudboard:statuses');
    if (!localBoard || !localStatuses) {
      createBoard('LocalBoard');
      return;
    };
    setBoard(JSON.parse(localBoard));
    setStatuses(JSON.parse(localStatuses));
  }, []);

  function createBoard(name: string) {
    const boardId = v4();
    const newStatuses = initialStatuses.map((status) => {
      return {
        ...status,
        id: v4(),
        boardId,
        cardsIds: [],
      };
    });
    const statusesIds = newStatuses.map((status) => {
      return status.id;
    });
    const newBoard = {
      id: boardId,
      name,
      statusesIds,
    };
    setBoard(newBoard);
    setStatuses(newStatuses);
    localStorage.setItem('@hudboard:id', boardId);
    localStorage.setItem('@hudboard:board', JSON.stringify(newBoard));
    localStorage.setItem('@hudboard:statuses', JSON.stringify(newStatuses));
    return boardId;
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        statuses,
        createBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard() {
  const context = useContext(BoardContext);
  return context;
};