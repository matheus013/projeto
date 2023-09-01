import {
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  doc,
  query,
  collection,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./app";

export const database = getFirestore(app);

export const getData = async (path: string, path2: any) => {
  let ref = doc(database, path, path2);

  const data = await getDoc(ref);
  
  return data.data();
};

export const setUniqueDoc = async (
  collectionName: string,
  docName: string,
  data: object
) => {
  const ref = doc(database, collectionName, docName);

  return new Promise((resolve, reject) => {
    getDoc(ref).then((docData) => {
      if (!docData.exists()) {
        const ref = doc(database, collectionName);
        setDoc(ref, data)
          .then(() => {
            resolve(null);
          })
          .catch((error) => reject(error));
      } else {
        reject("document/already-in-use");
      }
    });
  });
};

export const setDocWithRandomUID = (
  collectionName: string,
  data: any
): Promise<any> => {
  const ref = collection(database, collectionName);
  return new Promise((resolve, reject) => {
    addDoc(ref, data)
      .then((docInfo) => {
        data.uid = docInfo.id;
        setDoc(doc(database, collectionName, docInfo.id), data).then(
          (docFinallyData: any) => {
            const uid = docInfo.id;
            Object.assign(data, { uid: uid });
            resolve(data);
          }
        );
      })
      .catch((error) => reject(error));
  });
};

export const getUIDDoc = async (path: string, path2: string) => {
  let ref = doc(database, path, path2);

  let data = await getDoc(ref);

  return data;
};

export const setDocWithUID = (
  collectionName: string,
  uid: string,
  data: any
) => {
  const ref = doc(database, collectionName, uid);
  return new Promise((resolve, reject) => {
    setDoc(ref, data)
      .then(() => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const updateData = (
  collectionName: string,
  docName: string,
  data: object
) => {
  return new Promise((resolve, reject) => {
    updateDoc(doc(database, collectionName, docName), data)
      .then(() => {
        resolve(null);
      })
      .catch((error) => reject(error));
  });
};

export const getAllData = async (path: string) => {
  const q = query(collection(database, path));
  const docs = await getDocs(q);

  return docs;
};

export const deleteDocData = (collectionName: string, docName: string) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(database, collectionName, docName))
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAllCompanyUsers = async (companyUID: string) => {
  return new Promise((resolve, reject) => {
    const usersRef = collection(database, "Users");
    const q = query(usersRef, where("companyUID", "==", companyUID));

    const querySnapshot = getDocs(q).then((snap) => {
      snap.forEach((doc) => {
        deleteDoc(doc.ref)
          .then(() => resolve(null))
          .catch((error) => reject(error));
      });
    });
  });
};

export const getConditionalData = async (
  collectionName: string,
  storeUID?: string,
  firstCodition?: string
) => {
  const usersRef = collection(database, collectionName);
  let q;
  if(firstCodition){
    q = query(usersRef, where(firstCodition, "==", storeUID));
  } else {
    q = query(usersRef, where("storeUID", "==", storeUID));
  }
  const docs = await getDocs(q);

  return docs;
};

