import { createContext, useState } from "react";
import { ArrowFunction } from "typescript";

interface DialogContextType {
  dialogOptions: DialogOptionsType;
  setDialogOptions: any;
  handleClose: (func?: Function | ArrowFunction) => any;
}

interface DialogOptionsType {
  open: boolean;
  title: string;
  data?: any;
  message: string;
  type?: "alert" | "form" | "information";
  fields?: any;
  closeButtonName?: string;
  confirmButtonName?: string;
  onClose?: (...params: any) => any;
  onConfirm?: (...params: any) => any;
}

export const DialogContext = createContext({} as DialogContextType);

export const DialogProvider = ({ children }: any) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptionsType>({
    open: false,
    title: "",
    message: "",
    data: null,
    fields: [],
    type: "alert",
  });

  const handleClose = (func?: Function | ArrowFunction) => {
    setDialogOptions({
      open: false,
      message: "",
      title: "",
      data: null,
      fields: [],
      type: "alert",
    });
  };

  return (
    <DialogContext.Provider
      value={{
        dialogOptions,
        setDialogOptions,
        handleClose
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
