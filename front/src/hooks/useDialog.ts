import { useContext } from "react";
import { DialogContext } from "@/contexts/DialogContext";

export const useDialog = () => {
  const { dialogOptions, setDialogOptions, handleClose } = useContext(DialogContext);

  return { dialogOptions, setDialogOptions, handleClose };
};
