import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

import { emptyBoard, initialStatuses } from "../data/initialData";
import { api } from "../services/api";
import { IBoard, ICard, IStatus } from "../types/IBoard";
import { IProviderProps } from "./AppProvider";
import { useModal } from "./useModal";

interface IBoardContextProps {
  board: IBoard,
  editCard: ICard | undefined,
  createBoard: (name: string) => Promise<void>,
  loadBoard: (id: string) => Promise<void>,
  updateStatuses: (statuses: IStatus[]) => Promise<void>,
  createCard: (card: ICard) => Promise<void>,
  updateCard: (card: ICard) => Promise<void>,
  deleteCard: (id: string) => Promise<void>,
  toggleTask: (id: string) => Promise<void>,
  setEditCard: (card?: ICard) => void,
}

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

export function BoardProvider({ children }: IProviderProps) {
  const [board, setBoard] = useState<IBoard>(emptyBoard);
  const [editCard, setEditCard] = useState<ICard>();

  const { toggleStartModal } = useModal();

  useEffect(() => {
    const localId = localStorage.getItem("@hudboard:id");
    if (localId) {
      loadBoard(localId);
      return;
    };
    toggleStartModal();
    // eslint-disable-next-line
  }, []);

  async function createBoard(name: string) {
    const newBoard = { id: v4(), name, statuses: initialStatuses };
    try {
      await api.post('create-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    localStorage.setItem("@hudboard:id", newBoard.id);
    setBoard(newBoard);
    return;
  };

  async function loadBoard(id: string) {
    try {
      const response = await api.post('load-board', { id });
      localStorage.setItem("@hudboard:id", response.data.id);
      const newBoard: IBoard = {
        id: response.data.id,
        name: response.data.name,
        statuses: response.data.statuses,
      };
      setBoard(newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
  };

  async function updateStatuses(statuses: IStatus[]) {
    const newBoard = {
      ...board,
      statuses,
    };
    try {
      await api.post('/edit-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    setBoard(newBoard);
  };

  async function createCard(newCard: ICard) {
    const newBoard = {
      ...board,
      statuses: board.statuses.map((status) => {
        if (status.id === newCard.statusId) status.cards.push(newCard);
        return status;
      }),
    };
    try {
      await api.post('/edit-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    setBoard(newBoard);
  };

  async function updateCard(newCard: ICard) {
    const newBoard = {
      ...board,
      statuses: board.statuses.map((status) => {
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
      }),
    };
    try {
      await api.post('/edit-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    setBoard(newBoard);
  };

  async function deleteCard(cardId: string) {
    const newBoard = {
      ...board,
      statuses: board.statuses.map((status) => {
        const cards = status.cards.filter((card) => card.id !== cardId);
        return { ...status, cards };
      }),
    };
    try {
      await api.post('/edit-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    setBoard(newBoard);
  };

  async function toggleTask(taskId: string) {
    const newBoard = {
      ...board,
      statuses: board.statuses.map((statuses) => {
        return {
          ...statuses,
          cards: statuses.cards.map((card) => {
            return {
              ...card,
              tasks: card.tasks.map((task) => {
                if (task.id === taskId) task.isDone = !task.isDone;
                return task;
              }),
            };
          }),
        };
      }),
    };
    try {
      await api.post('/edit-board', newBoard);
    } catch (error) {
      console.log(error);
      throw error;
    };
    setBoard(newBoard);
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        editCard,
        createBoard,
        loadBoard,
        updateStatuses,
        createCard,
        updateCard,
        deleteCard,
        setEditCard,
        toggleTask,
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
