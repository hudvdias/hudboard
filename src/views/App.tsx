import { Flex } from "@chakra-ui/react";

import { AppProvider } from "../hooks/AppProvider";
import { Header } from "../components/main/Header";
import { Board } from "../components/main/Board";
import { StartModal } from "../components/modals/StartModal";
import { CreateCardModal } from "../components/modals/CreateCardModal";
import { EditCardModal } from "../components/modals/EditCardModal";

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
        <CreateCardModal />
        <EditCardModal />
      </Flex>
    </AppProvider>
  );
};