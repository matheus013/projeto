import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./app";

export const storage = getStorage(app);

export const setFile = (path: string, file: any) => {
  const reference = ref(storage, path);

  return new Promise((resolve, reject) => {
    uploadBytes(reference, file)
      .then(() => resolve(null))
      .catch((error) => reject(error));
  });
};

export const getFile = (path: string) : Promise<string> => {
  const reference = ref(storage, path);
  return new Promise((resolve, reject) => {
    getDownloadURL(reference)
      .then((url) => resolve(url))
      .catch(() => {
        resolve("");
      });
  });
};

export const setFileAndGetURL = (path: string, file: any) => {
  return new Promise((resolve, reject) => {
    const reference = ref(storage, path);

    uploadBytes(reference, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};

export const getFileSrc = () => {};

export const deleteFile = (path: string) => {
  const reference = ref(storage, path);
  return new Promise((resolve, reject) => {
    deleteObject(reference)
      .then(() => resolve(null))
      .catch((error) => resolve(null));
  });
};

export const deleteFolder = () => {};
