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
  cardsIds: string[],
};

export interface ICard {
  id: string,
  statusId: string,
  title: string,
  tasksIds: string[],
};

export interface ITask {
  id: string,
  cardId: string,
  title: string,
  completed: boolean,
};