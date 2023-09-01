import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export const useTheme = () => {
  const { theme, updateTheme, defaultTheme } = useContext(ThemeContext);

  return { currentTheme: theme, setTheme: updateTheme, defaultTheme };
};
