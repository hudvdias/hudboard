import { Flex } from "@chakra-ui/react";

import { AppProvider } from "../hooks/AppProvider";
import { Header } from "../components/main/Header";
import { Board } from "../components/main/Board";

export function App() {
  return (
    <AppProvider>
      <Flex
        height="100vh"
        width="100vw"
        flexDirection="column"
      >
        <Header />
        <Board />
      </Flex>
    </AppProvider>
  );
};