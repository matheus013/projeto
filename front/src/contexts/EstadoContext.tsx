import { createContext, useContext, useEffect, useState } from "react";

interface EstadoContextType {
  uf: string;
  changeUF: (state: string) => void;
}

const EstadoContext = createContext({} as EstadoContextType);

export const EstadoProvider = ({ children }: any) => {
  const [uf, setUf] = useState<string>("");

  const changeUF = (state: string) => {
    setUf(state)
  }

  return (
    <EstadoContext.Provider value={{ uf, changeUF }}>
      {children}
    </EstadoContext.Provider>
  );
};

export const useEstado = () => {
  const { uf, changeUF } = useContext(EstadoContext);
  
  return { uf, changeUF };
};
