import { Flex } from "@chakra-ui/react";

import { AppProvider } from "../hooks/AppProvider";
import { Header } from "../components/main/Header";

export function App() {
  return (
    <AppProvider>
      <Flex
        height="100vh"
        width="100vw"
      >
        <Header />
      </Flex>
    </AppProvider>
  );
};