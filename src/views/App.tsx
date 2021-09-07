import { Flex } from "@chakra-ui/react";

import { AppProvider } from "../hooks/AppProvider";
import { Header } from "../components/main/Header";
import { Board } from "../components/main/Board";
import { StartModal } from "../components/modals/StartModal";
import { CardModal } from "../components/modals/CardModal";

export function App() {
  return (
    <AppProvider>
      <Flex
        height="100vh"
        width="100vw"
        flexDirection="column"
      >
        <StartModal />
        <Header />
        <Board />
        <CardModal />
      </Flex>
    </AppProvider>
  );
};