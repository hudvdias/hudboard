import { useRef, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react";

import { useModal } from "../../hooks/useModal";
import { useBoard } from "../../hooks/useBoard";

interface IDeleteCardAlertProps {
  cardId: string,
};

export function DeleteCardAlert({ cardId }: IDeleteCardAlertProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const cancelRef = useRef(null);
  const { isDeleteCardAlertOpen, toggleDeleteCardAlert, toggleCardModal } = useModal();
  const { deleteCard } = useBoard();
  const toast = useToast();

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    try {
      await deleteCard(cardId);
      toggleDeleteCardAlert();
      toggleCardModal();
      toast({
        status: 'success',
        description: 'Your card has been deleted.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Could not delete card.',
        description: 'Try again later or verify your connection.',
        isClosable: true,
        position: 'bottom-left',
        variant: 'left-accent',
      });
    }
    setDeleteLoading(false);
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
              isLoading={deleteLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};