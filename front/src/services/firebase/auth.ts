import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getData, setDocWithUID } from "./firestore";
import { UserCredential } from "firebase/auth";
import { app } from "./app";

interface LoginDataType {
  email: string;
  password: string;
}

interface RegisterDataType {
  email: string;
  password: string;
  additionalData?: any;
}

interface FirestoreData {
  email: string;
  name: string;
  storeUID: string;
  accountType: string;
}

export const auth = getAuth(app);

export const requestSignIn = async ({ email, password }: LoginDataType) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  const data = (await getData("Users/", response.user.uid)) as FirestoreData;
  const storeData = await getData("Stores/", data.storeUID);
  return {
    token: response.user.uid,
    user: {
      email: data.email,
      accountType: data.accountType,
      storeUID: data.storeUID,
      name: data.name,
      storeData: storeData,
    },
  };
};

export const createAccount = async ({
  email,
  password,
  additionalData,
}: RegisterDataType): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        console.log(credentials);
        setDocWithUID("Users", credentials.user.uid, {
          email: credentials.user.email,
          ...additionalData,
        });
        resolve(credentials);
      })
      .catch((error) => reject(error));
  });
};

export const getErrorMsg = (errorCode: string): string => {
  let msg = "";

  switch (errorCode) {
    case "auth/user-not-found":
      msg = "Usuário não encontrado!";
      break;
    case "auth/wrong-password":
      msg = "As informações fornecidas não estão corretas!";
      break;
  }

  return msg;
};

export const logOut = async () => {
  await signOut(auth);
};

export const UpdateEmail = (oldEmail: string, newEmail: string) => {
  return new Promise((resolve, reject) => {});
};
