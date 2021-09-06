import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

interface IProviderProps {
  children: React.ReactNode,
}

export function AppProvider({ children }: IProviderProps) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};