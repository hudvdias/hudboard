import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";
import { initialStatuses } from "../data/statuses";
import { IBoard, ICard, IStatus, ITask } from "../types/IBoard";
import { IProviderProps } from "./AppProvider";
import { useModal } from "./useModal";

interface IBoardContextProps {
  board: IBoard,
  statuses: IStatus[],
  cards: ICard[],
  tasks: ITask[],
  createBoard: (name: string) => void,
  createCard: (card: ICard, tasks: ITask[]) => void,
  editCard: (card: ICard, tasks: ITask[]) => void,
  deleteCard: (id: string) => void;
  toggleTask: (id: string) => void,
};

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

export function BoardProvider({ children }: IProviderProps) {
  const [board, setBoard] = useState<IBoard>({} as IBoard);
  const [statuses, setStatuses] = useState<IStatus[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { toggleStartModal } = useModal();

  useEffect(() => {
    const localBoard = localStorage.getItem('@hudboard:board');
    const localStatuses = localStorage.getItem('@hudboard:statuses');
    if (!localBoard || !localStatuses) {
      toggleStartModal();
      return;
    };
    setBoard(JSON.parse(localBoard));
    setStatuses(JSON.parse(localStatuses));
    const localCards = localStorage.getItem('@hudboard:cards');
    const localTasks = localStorage.getItem('@hudboard:tasks');
    if (localCards) {
      setCards(JSON.parse(localCards));
    }
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }
    return;
    // eslint-disable-next-line
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
    localStorage.setItem('@hudboard:board', JSON.stringify(newBoard));
    localStorage.setItem('@hudboard:statuses', JSON.stringify(newStatuses));
    return;
  };

  function createCard(card: ICard, myTasks: ITask[]) {
    const newStatuses = statuses.map((status) => {
      if (status.id === card.statusId) {
        status.cardsIds.push(card.id);
      }
      return status;
    });
    const newCards = [ ...cards, card ];
    const newTasks = [ ...tasks, ...myTasks ]
    setStatuses(newStatuses);
    setCards(newCards);
    setTasks(newTasks);
    localStorage.setItem('@hudboard:statuses', JSON.stringify(newStatuses));
    localStorage.setItem('@hudboard:cards', JSON.stringify(newCards));
    localStorage.setItem('@hudboard:tasks', JSON.stringify(newTasks));
    return;
  };

  function toggleTask(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      };
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem('@hudboard:tasks', JSON.stringify(newTasks));
    return;
  };

  function editCard(myCard: ICard, myTasks: ITask[]) {
    const newStatuses = statuses.map((status) => {
      if (status.cardsIds.includes(myCard.id)) {
        if (status.id === myCard.statusId) {
          return status;
        };
        const newCardsIds = status.cardsIds.filter((cardId) => {
          return cardId !== myCard.id;
        });
        return {
          ...status,
          cardsIds: newCardsIds,
        };
      };
      if (status.id === myCard.statusId) {
        status.cardsIds.push(myCard.id);
      }
      return status;
    });
    const newCards = cards.map((card) => {
      if (card.id === myCard.id) {
        return myCard;
      };
      return card;
    });
    const filteredTasks = tasks.filter((task) => {
      return task.cardId !== myCard.id;
    });
    const newTasks = [ ...filteredTasks, ...myTasks ]
    setStatuses(newStatuses);
    setCards(newCards);
    setTasks(newTasks);
    localStorage.setItem('@hudboard:statuses', JSON.stringify(newStatuses));
    localStorage.setItem('@hudboard:cards', JSON.stringify(newCards));
    localStorage.setItem('@hudboard:tasks', JSON.stringify(newTasks));
    return;
  };

  function deleteCard(id: string) {
    const newStatuses = statuses.map((status) => {
      const newCardsIds = status.cardsIds.filter((cardId) => {
        return cardId !== id;
      });
      return {
        ...status,
        cardsIds: newCardsIds,
      };
    });
    const newCards = cards.filter((card) => {
      return card.id !== id;
    });
    const newTasks = tasks.filter((task) => {
      return task.cardId !== id;
    });
    setStatuses(newStatuses);
    setCards(newCards);
    setTasks(newTasks);
    localStorage.setItem('@hudboard:statuses', JSON.stringify(newStatuses));
    localStorage.setItem('@hudboard:cards', JSON.stringify(newCards));
    localStorage.setItem('@hudboard:tasks', JSON.stringify(newTasks));
    return;
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        statuses,
        cards,
        tasks,
        createBoard,
        createCard,
        editCard,
        deleteCard,
        toggleTask,
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