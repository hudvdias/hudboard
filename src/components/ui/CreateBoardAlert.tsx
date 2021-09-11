import { useRef } from "react";
import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Button, Text } from "@chakra-ui/react";

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
      size="xl"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader />
          <AlertDialogBody>
            <Text
              fontSize="xl"
              fontWeight="700"
              marginBottom="16px"
            >
              Your Board has been created!
            </Text>
            <Alert
              status="info"
              variant="solid"
            >
              <AlertIcon />
              <AlertTitle>
                Board ID:
              </AlertTitle>
              <AlertDescription>
                {board.id}
              </AlertDescription>
            </Alert>
            <Text
              marginTop="16px"
              fontSize="sm"
            >
              Please, save your Board ID in a secure place and use it to load your board anywhere!
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