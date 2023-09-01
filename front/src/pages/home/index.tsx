"use client";

import { SidebarProvider } from "@/contexts/SidebarContext";
import { Fragment, useContext, useState } from "react";
import AlertBox from "@/components/AlertBox/AlertBox";
import RightBar from "@/components/RightBar/RightBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Dialog from "@/components/Dialog/Dialog";
import Header from "@/components/Header/Header";
import Panel from "@/components/Panel/Panel";
import { useAuth } from "@/hooks/useAuth";
import Router from "next/router";

import Home from "@/components/dashboardPages/ADM/Home/Home";
import Requests from "@/components/dashboardPages/ADM/Requests/Requests";
import AbandonedCarts from "@/components/dashboardPages/ADM/abandonedCarts/abandonedCarts";
import Marketing from "@/components/dashboardPages/ADM/Marketing/Marketing";
import Products from "@/components/dashboardPages/ADM/Products/Products";
import Clients from "@/components/dashboardPages/ADM/Clients/Clients";
import Reports from "@/components/dashboardPages/ADM/Reports/Reports";
import Checkout from "@/components/dashboardPages/ADM/Checkout/Checkout";

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { user, isAuthenticated, signIn } = useAuth();
  console.log(user)
  if (isAuthenticated) {
    return (
      <Fragment>
        <SidebarProvider>
          <Sidebar />
          <Header openRightBar={() => setOpen(true)}/>
          <Panel>
            <Home openRightBar={() => setOpen(true)} />
            <Requests />
            <AbandonedCarts />
            <Products />
            <Clients />
            <Marketing />
            <Reports />
            <Checkout />
          </Panel>
          <RightBar open={open} setOpen={setOpen} />
        </SidebarProvider>
        <AlertBox />
        <Dialog />
      </Fragment>
    );
  } else {
    if (process.browser) {
      Router.push("/auth/login")
    }
  }
};

export default Dashboard;
