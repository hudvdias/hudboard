import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { IProviderProps } from "./AppProvider";

interface IModalContextProps {
  isStartModalOpen: boolean,
  isCardModalOpen: boolean,
  toggleModal: ({ modal }: IOpenModalProps) => void,
};

interface IOpenModalProps {
  modal: 'start' | 'card',
};

const ModalContext = createContext<IModalContextProps>({} as IModalContextProps);

export function ModalProvider({ children }: IProviderProps) {
  const [ isStartModalOpen, setIsStartModalOpen ] = useState(false);
  const [ isCardModalOpen, setIsCardModalOpen ] = useState(false);

  function toggleModal({ modal }: IOpenModalProps) {
    if (modal === 'start') {
      setIsStartModalOpen(!isStartModalOpen);
    };
    if (modal === 'card') {
      setIsCardModalOpen(!isCardModalOpen);
    };
    return;
  };

  return (
    <ModalContext.Provider
      value={{
        isStartModalOpen,
        isCardModalOpen,
        toggleModal,
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