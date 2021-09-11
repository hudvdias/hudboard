import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import { IProviderProps } from "./AppProvider";

interface IModalContextProps {
  isStartModalOpen: boolean,
  isCardModalOpen: boolean,
  isCreateBoardAlertOpen: boolean,
  isDeleteCardAlertOpen: boolean,
  toggleStartModal: () => void,
  toggleCardModal: () => void,
  toggleCreateBoardAlert: () => void,
  toggleDeleteCardAlert: () => void,
};

const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

export function ModalProvider({ children }: IProviderProps) {
  const [ isStartModalOpen, setIsStartModalOpen ] = useState(false);
  const [ isCardModalOpen, setIsCardModalOpen ] = useState(false);
  const [ isDeleteCardAlertOpen, setIsDeleteCardAlertOpen ] = useState(false);
  const [ isCreateBoardAlertOpen, setIsCreateBoardAlertOpen ] = useState(false);

  function toggleStartModal() {
    setIsStartModalOpen(!isStartModalOpen);
  };

  function toggleCardModal() {
    setIsCardModalOpen(!isCardModalOpen);
  };

  function toggleDeleteCardAlert() {
    setIsDeleteCardAlertOpen(!isDeleteCardAlertOpen);
  };

  function toggleCreateBoardAlert() {
    setIsCreateBoardAlertOpen(!isCreateBoardAlertOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        isStartModalOpen,
        isCardModalOpen,
        isCreateBoardAlertOpen,
        isDeleteCardAlertOpen,
        toggleStartModal,
        toggleCardModal,
        toggleCreateBoardAlert,
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