import { useRef } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useModal } from "../../hooks/useModal";
import { useBoard } from "../../hooks/useBoard";

interface IDeleteCardAlertProps {
  cardId: string,
};

export function DeleteCardAlert({ cardId }: IDeleteCardAlertProps) {
  const cancelRef = useRef(null);
  const { isDeleteCardAlertOpen, toggleDeleteCardAlert, toggleCardModal } = useModal();
  const { deleteCard } = useBoard();

  function handleConfirmDelete() {
    deleteCard(cardId);
    toggleDeleteCardAlert();
    toggleCardModal();
  };

  return (
    <AlertDialog
      isOpen={isDeleteCardAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => toggleDeleteCardAlert()}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            Delete Card
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this card?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              marginRight="16px"
              onClick={() => toggleDeleteCardAlert()}
            >
              Discard
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleConfirmDelete()}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};