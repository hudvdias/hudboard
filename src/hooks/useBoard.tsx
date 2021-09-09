import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

import { emptyBoard, initialStatuses } from "../data/initialData";
import { IBoard, ICard } from "../types/IBoard";
import { IProviderProps } from "./AppProvider";
import { useModal } from "./useModal";

interface IBoardContextProps {
  board: IBoard,
  editCard: ICard | undefined,
  createBoard: (name: string) => void,
  createCard: (card: ICard) => void,
  updateCard: (card: ICard) => void,
  deleteCard: (id: string) => void,
  setEditCard: (card?: ICard) => void,
}

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

export function BoardProvider({ children }: IProviderProps) {
  const [board, setBoard] = useState<IBoard>(emptyBoard);
  const [editCard, setEditCard] = useState<ICard>();

  const { toggleStartModal } = useModal();

  useEffect(() => {
    const localBoard = localStorage.getItem("@hudboard:board");
    if (localBoard) {
      setBoard(JSON.parse(localBoard));
      return;
    }
    toggleStartModal();
    // eslint-disable-next-line
  }, []);

  function createBoard(name: string) {
    const newBoard = { id: v4(), name, statuses: initialStatuses };
    localStorage.setItem("@hudboard:board", JSON.stringify(newBoard));
    setBoard(newBoard);
  };

  function createCard(newCard: ICard) {
    const statuses = board.statuses.map((status) => {
      if (status.id === newCard.statusId) status.cards.push(newCard);
      return status;
    });
    const newBoard = { ...board, statuses };
    localStorage.setItem("@hudboard:board", JSON.stringify(newBoard));
    setBoard(newBoard);
  };

  function updateCard(newCard: ICard) {
    const statuses = board.statuses.map((status) => {
      if (status.id === newCard.statusId) {
        const findCard = status.cards.find((card) => card.id === newCard.id);
        if (findCard) {
          const cards = status.cards.map((card) => {
            if (card.id === newCard.id) return newCard;
            else return card;
          });
          return { ...status, cards };
        } else {
          status.cards.push(newCard);
          return status;
        };
      } else {
        const cards = status.cards.filter((card) => card.id !== newCard.id);
        return { ...status, cards };  
      };
    });
    const newBoard = { ...board, statuses };
    localStorage.setItem("@hudboard:board", JSON.stringify(newBoard));
    setBoard(newBoard);
  };

  function deleteCard(cardId: string) {
    const statuses = board.statuses.map((status) => {
      const cards = status.cards.filter((card) => card.id !== cardId);
      return { ...status, cards };
    });
    const newBoard = { ...board, statuses };
    localStorage.setItem("@hudboard:board", JSON.stringify(newBoard));
    setBoard(newBoard);
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        editCard,
        createBoard,
        createCard,
        updateCard,
        deleteCard,
        setEditCard,
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
