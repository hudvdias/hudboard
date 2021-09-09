import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";
import { emptyBoard, initialStatuses } from "../data/initialData";
import { IBoard } from "../types/IBoard";
import { IProviderProps } from "./AppProvider";
import { useModal } from "./useModal";

interface IBoardContextProps {
  board: IBoard;
  createBoard: (name: string) => void;
}

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

export function BoardProvider({ children }: IProviderProps) {
  const [board, setBoard] = useState<IBoard>(emptyBoard);

  const { toggleStartModal } = useModal();

  useEffect(() => {
    const localBoard = localStorage.getItem("@hudboard:board");
    if (localBoard) {
      setBoard(JSON.parse(localBoard));
      return;
    }
    toggleStartModal();
    return;
    // eslint-disable-next-line
  }, []);

  function createBoard(name: string) {
    const newBoard = {
      id: v4(),
      name,
      statuses: initialStatuses,
    };
    localStorage.setItem("@hudboard:board", JSON.stringify(newBoard));
    setBoard(newBoard);
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        createBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  return context;
}
