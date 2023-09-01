import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

export const useSidebar = () => {
  const { page, setPage, setImageBrand, image, width, setWidth } = useContext(SidebarContext);
  
  return { page, setPage, setImageBrand, image, width, setWidth };
}