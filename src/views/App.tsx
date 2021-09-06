import { Flex } from "@chakra-ui/react";
import { AppProvider } from "../hooks/AppProvider";

export function App() {
  return (
    <AppProvider>
      <Flex
        height="100vh"
        width="100vw"
      />
    </AppProvider>
  );
};