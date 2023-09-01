"use client"

import React, { useContext, useState, createContext } from "react";
import { AlertColor } from "@mui/material";

interface AlertContextType {
  alertOptions: AlertOptionsType;
  setAlertOptions: React.Dispatch<React.SetStateAction<AlertOptionsType>>;
}

interface AlertOptionsType {
  open: boolean;
  type: AlertColor;
  message: any;
  time: number;
}

export const AlertContext = createContext({} as AlertContextType);

const AlertBoxProvider = ({ children }: any) => {
  const [alertOptions, setAlertOptions] = useState<AlertOptionsType>({
    open: false,
    type: "success",
    message: "teste",
    time: 2000,
  });

  return (
    <AlertContext.Provider
      value={{
        alertOptions,
        setAlertOptions,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertBox = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useModal must be used within a provider AlertBoxProvider");

  return { ...context };
};

export default AlertBoxProvider;
