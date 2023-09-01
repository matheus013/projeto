import { ThemeProvider as ThemeProviderS } from "styled-components";
import { createContext, useState, useEffect } from "react";
import { getData } from "@/services/firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

interface ThemeContextType {
  updateTheme: (arg: any) => void;
  theme: ThemeDataType;
  defaultTheme: ThemeDataType;
}

interface ThemeDataType {
  primaryColor: string;
  sidebar: {
    backgroundColor: string;
    "list-bg": string;
    "list-color": string;
  };
}

export const defaultTheme = {
  primaryColor: "#FF0066;",

  sidebar: {
    backgroundColor: "#FF0066;",
    "list-bg": "white",
    "list-color": "#0F1A37",
  },
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeDataType>(defaultTheme);
  const { user } = useAuth();

  const updateTheme = (newTheme: ThemeDataType) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    if (user) {
      if (user.storeData.theme) {
        setTheme(user.storeData.theme);
      }
    }
  }, [user]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, defaultTheme }}>
      <ThemeProviderS theme={theme}>{children}</ThemeProviderS>
    </ThemeContext.Provider>
  );
};
