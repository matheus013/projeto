import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, signIn, setUser } = useContext(AuthContext); 

  return { user, isAuthenticated, signIn, setUser };
};