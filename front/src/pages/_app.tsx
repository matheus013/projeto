import "@/components/dashboardPages/ADM/Requests/Requests.css";
import "@/components/dashboardPages/ADM/Marketing/Marketing.css"
import "@/components/dashboardPages/ADM/Home/Home.css";
import "@/components/GenerateForm/GenerateForm.css";
import "@/components/InputGroup/InputGroup.css";
import "@/components/RightBar/RightBar.css";
import "@/components/Sidebar/Sidebar.css";
import "@/components/Header/Header.css";
import "@/components/Forms/Form.css"
import "@/styles/checkout.css"
import "@/styles/globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DialogProvider } from "@/contexts/DialogContext";
import AlertBoxProvider from "@/contexts/AlertContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Fragment } from "react";

interface AppPropsType {
  Component: any;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return <Fragment>
    <AuthProvider>
      <ThemeProvider>
        <DialogProvider>
          <AlertBoxProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AlertBoxProvider>
        </DialogProvider>
      </ThemeProvider>
    </AuthProvider>
  </Fragment>
};

export default MyApp;