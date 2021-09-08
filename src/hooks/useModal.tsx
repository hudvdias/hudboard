import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { IProviderProps } from "./AppProvider";

interface IModalContextProps {
  isStartModalOpen: boolean,
  isCreateCardModalOpen: boolean,
  isEditCardModalOpen: boolean,
  editCardId: string,
  toggleStartModal: () => void,
  toggleCreateCardModal: () => void,
  toggleEditCardModal: (id?: string) => void,
};

const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

export function ModalProvider({ children }: IProviderProps) {
  const [ isStartModalOpen, setIsStartModalOpen ] = useState(false);
  const [ isCreateCardModalOpen, setIsCreateCardModalOpen ] = useState(false);
  const [ isEditCardModalOpen, setIsEditCardModalOpen ] = useState(false);
  const [ myEditCardId, setMyEditCardId ] = useState('');

  function toggleStartModal() {
    setIsStartModalOpen(!isStartModalOpen);
    return;
  };

  function toggleCreateCardModal() {
    setIsCreateCardModalOpen(!isCreateCardModalOpen);
    return;
  };

  function toggleEditCardModal(id?: string) {
    if (id) {
      setMyEditCardId(id);
      setIsEditCardModalOpen(true);
      return;
    }
    setIsEditCardModalOpen(false);
    return;
  };

  return (
    <ModalContext.Provider
      value={{
        isStartModalOpen,
        isCreateCardModalOpen,
        isEditCardModalOpen,
        editCardId: myEditCardId,
        toggleStartModal,
        toggleCreateCardModal,
        toggleEditCardModal,
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