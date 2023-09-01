'use client'

import React, { useState, createContext } from "react";
import { requestSignIn } from "@/services/firebase/auth";
import { useAlertBox } from "./AlertContext";
import { useRouter } from "next/navigation";

interface UserInfoData {
  email: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
};

interface AuthContextType {
  user?: any;
  setUser: any;
  signIn: (data: SignInData) => Promise<any>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const { setAlertOptions } = useAlertBox();

  const router = useRouter();

  const [user, setUser] = useState<UserInfoData | null>(null);
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInData) => {
    return new Promise((resolve, reject) => {
      requestSignIn({ email: email, password: password })
        .then((credentials) => {
          setUser(credentials.user);
          resolve(credentials)
        })
        .catch((error) => reject(error))
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  )
};
