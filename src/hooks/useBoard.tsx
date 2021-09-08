import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";
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
  toggleTask: (id: string) => void,
};

const BoardContext = createContext<IBoardContextProps>({} as IBoardContextProps);

const initialStatuses = [
  {
    title: 'draft',
    color: 'gray',
  },
  {
    title: 'ready',
    color: 'yellow',
  },
  {
    title: 'pending',
    color: 'orange',
  },
  {
    title: 'in progress',
    color: 'red',
  },
  {
    title: 'completed',
    color: 'green',
  },
];

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
    return boardId;
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

  return (
    <BoardContext.Provider
      value={{
        board,
        statuses,
        cards,
        tasks,
        createBoard,
        createCard,
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