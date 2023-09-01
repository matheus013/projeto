import { initializeApp, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth"

export const updateUserEmail = (
  newEmail: string,
  uid: string
) => {
  return new Promise((resolve, reject) => {
    getAuth()
      .updateUser(uid, {
        email: newEmail,
      })
      .then(() => resolve(""))
      .catch((error) => reject(error));
  });
};
