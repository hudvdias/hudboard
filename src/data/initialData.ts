import { IBoard, IStatus } from "../types/IBoard";

export const emptyBoard: IBoard = {
  id: '',
  name: '',
  statuses: [],
};

export const initialStatuses: IStatus[] = [
  {
    id: '1',
    title: 'draft',
    color: 'gray',
    cards: [],
  },
  {
    id: '2',
    title: 'ready',
    color: 'yellow',
    cards: [],
  },
  {
    id: '3',
    title: 'pending',
    color: 'orange',
    cards: [],
  },
  {
    id: '4',
    title: 'in progress',
    color: 'red',
    cards: [],
  },
  {
    id: '5',
    title: 'complete',
    color: 'green',
    cards: [],
  },
];