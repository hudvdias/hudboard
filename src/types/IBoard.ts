export interface IBoard {
  id: string,
  name: string,
  statuses: IStatus[],
};

export interface IStatus {
  id: string,
  title: string,
  color: string,
  cards: ICard[],
};

export interface ICard {
  id: string,
  title: string,
  statusId: string,
  icon: string,
  tasks: ITask[],
};

export interface ITask {
  id: string,
  title: string,
  isDone: boolean,
};