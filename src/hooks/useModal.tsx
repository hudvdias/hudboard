import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { IProviderProps } from "./AppProvider";

interface IModalContextProps {
  isStartModalOpen: boolean,
  isCardModalOpen: boolean,
  toggleStartModal: () => void,
  toggleCardModal: () => void,
};

const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

export function ModalProvider({ children }: IProviderProps) {
  const [ isStartModalOpen, setIsStartModalOpen ] = useState(false);
  const [ isCardModalOpen, setIsCardModalOpen ] = useState(false);

  function toggleStartModal() {
    setIsStartModalOpen(!isStartModalOpen);
    return;
  };

  function toggleCardModal() {
    setIsCardModalOpen(!isCardModalOpen);
    return;
  };

  return (
    <ModalContext.Provider
      value={{
        isStartModalOpen,
        isCardModalOpen,
        toggleStartModal,
        toggleCardModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  return context;
};