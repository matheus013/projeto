import { useAlertBox } from "@/contexts/AlertContext";
import AlertBox from "./AlertBox/AlertBox";
import Dialog from "./Dialog/Dialog";
import { Fragment } from "react";
import Head from "next/head";

const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <Head>
        <title>Black Bull Pay</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      {children}
      <AlertBox />
      <Dialog />
    </Fragment>
  )
};

export default Layout;