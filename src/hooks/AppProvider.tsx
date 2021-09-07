import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { BoardProvider } from "./useBoard";
import { ModalProvider } from "./useModal";

export interface IProviderProps {
  children: React.ReactNode,
}

export function AppProvider({ children }: IProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <BoardProvider>
          {children}
        </BoardProvider>
      </ModalProvider>
    </ChakraProvider>
  );
};