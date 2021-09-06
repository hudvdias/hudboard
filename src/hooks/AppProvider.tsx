import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

interface IProviderProps {
  children: React.ReactNode,
}

export function AppProvider({ children }: IProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};