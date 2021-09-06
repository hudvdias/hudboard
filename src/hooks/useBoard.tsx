import { createContext, useContext } from "react";
import { IProviderProps } from "./AppProvider";

const BoardContext = createContext({});

export function BoardProvider({ children }: IProviderProps) {
  return (
    <BoardContext.Provider
      value={{}}
    >
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard() {
  const context = useContext(BoardContext);
  return context;
};