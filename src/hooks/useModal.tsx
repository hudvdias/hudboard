import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import { IProviderProps } from "./AppProvider";

interface IModalContextProps {
  isStartModalOpen: boolean,
  isCardModalOpen: boolean,
  isDeleteCardAlertOpen: boolean,
  toggleStartModal: () => void,
  toggleCardModal: () => void,
  toggleDeleteCardAlert: () => void,
};

const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

export function ModalProvider({ children }: IProviderProps) {
  const [ isStartModalOpen, setIsStartModalOpen ] = useState(false);
  const [ isCardModalOpen, setIsCardModalOpen ] = useState(false);
  const [ isDeleteCardAlertOpen, setIsDeleteCardAlertOpen ] = useState(false);

  function toggleStartModal() {
    setIsStartModalOpen(!isStartModalOpen);
  };

  function toggleCardModal() {
    setIsCardModalOpen(!isCardModalOpen);
  };

  function toggleDeleteCardAlert() {
    setIsDeleteCardAlertOpen(!isDeleteCardAlertOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        isStartModalOpen,
        isCardModalOpen,
        isDeleteCardAlertOpen,
        toggleStartModal,
        toggleCardModal,
        toggleDeleteCardAlert,
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