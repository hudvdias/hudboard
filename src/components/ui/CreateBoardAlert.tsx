import { useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Heading, Text } from "@chakra-ui/react";

import { useModal } from "../../hooks/useModal";
import { useBoard } from "../../hooks/useBoard";

export function CreateBoardAlert() {
  const cancelRef = useRef(null);
  const { isCreateBoardAlertOpen, toggleCreateBoardAlert } = useModal();
  const { board } = useBoard();

  function handleSubmit() {
    toggleCreateBoardAlert();
  };

  return (
    <AlertDialog
      isOpen={isCreateBoardAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => toggleCreateBoardAlert()}
      size="lg"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Board Created
          </AlertDialogHeader>
          <AlertDialogBody>
            <Heading
              size="md"
            >
              Board ID: {board.id}
            </Heading>
            <Text
              marginTop="16px"
            >
              Please, save your board id in a secure place and use it to load your board anywhere!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleSubmit()}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};