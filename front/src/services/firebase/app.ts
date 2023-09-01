import {getApp, getApps, initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAsXWKi7hEKLDR40uK-nsMa7c1BzJZIRVg",
  authDomain: "blackbullpay-267dd.firebaseapp.com",
  projectId: "blackbullpay-267dd",
  storageBucket: "blackbullpay-267dd.appspot.com",
  messagingSenderId: "800148220690",
  appId: "1:800148220690:web:198512850c600704d0e1cb",
  measurementId: "G-CXSYFHSGXV"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export { app };
