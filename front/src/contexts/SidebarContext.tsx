import { useState } from "react";
import { createContext } from "react";

interface SidebarContextType {
  page: number,
  image: string;
  setImageBrand: (url: string) => void;
  setPage: (idx: number) => void;
  width: string | number;
  setWidth: (width: number | string) => void;
};

export const SidebarContext = createContext({} as SidebarContextType);

export const SidebarProvider = ({ children }: any) => {
  const [page, setPageIdx] = useState<number>(0);
  const [image, setImage] = useState<any>("");
  const [width, setSidebarWidth] = useState<string | number>("282px");

  const setPage = (idx: number) => {
    setPageIdx(idx);
  };

  const setImageBrand = (url: string) => {
    setImage(url);
  }

  const setWidth = (width: number | string) => {
    setSidebarWidth(width);
  }

  return (
    <SidebarContext.Provider value={{ page, setPage, setImageBrand, image, width, setWidth }}>
      {children}
    </SidebarContext.Provider>
  )
};
