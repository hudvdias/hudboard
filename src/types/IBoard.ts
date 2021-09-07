export interface IBoard {
  id: string,
  name: string,
  statusesIds: string[],
};

export interface IStatus {
  id: string,
  boardId: string,
  title: string,
  color: string,
  step: number,
  cardsIds: string[],
};

export interface ICard {
  id: string,
  statusId: string,
  index: number,
  title: string,
  createdAt: Date,
  note?: string,
  deadline?: string,
  link?: string,
  frequency?: 'daily' | 'weekly' | 'monthly',
  tasksIds: string[],
};

export interface ITask {
  id: string,
  cardId: string,
  title: string,
  completed: boolean,
  active?: boolean,
  block?: boolean,
  subtasksIds: string[],
};

export interface ISubtask {
  id: string,
  taskId: string,
  title: string,
  completed: boolean,
};