import {
  setDocWithRandomUID,
  setDocWithUID,
} from "@/services/firebase/firestore";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import InputGroup from "@/components/InputGroup/InputGroup";
import { createAccount } from "@/services/firebase/auth";
import { useAlertBox } from "@/contexts/AlertContext";
import { FieldValues } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useTheme } from "@/hooks/useTheme";
import { useState, Fragment } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Router from "next/router";

const RegisterForm = () => {
  const [load, setLoad] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const { setAlertOptions } = useAlertBox();
  const { currentTheme } = useTheme();
  const { signIn } = useAuth();

  const submit = async (data: FieldValues) => {
    console.log(data);
    try {
      setLoad(true);
      const date = new Date();
      const dataToSend = {
        name: data.name,
        shopName: data.name,
        email: data.email,
        registerTime: date.toLocaleDateString("pt-BR"),
        registerHour: String(date.getHours()).padStart(0, "2"),
        registerMinute: date.getMinutes(),
      };
      if (data.confirmEmail === data.email) {
        if (data.confirmPassword === data.password) {
          const newAccount = await createAccount({
            email: data.email,
            password: data.password,
          });
          const accountDB = await setDocWithRandomUID("Stores", dataToSend);
          const userAccount = await setDocWithUID(
            "Users/",
            newAccount.user.uid,
            {
              name: accountDB.name,
              storeUID: accountDB.uid,
              accountType: "Stores",
              email: accountDB.email,
            }
          );
          setLoad(false);
        } else {
          throw new Error("Senhas não conferem!");
        }
      } else {
        throw new Error("Emails não conferem!");
      }
      Router.push("/auth/login");
    } catch (error: any) {
      setAlertOptions({
        type: "error",
        time: 4000,
        message: error.message || error,
        open: true,
      });
      setLoad(false);
    }
  };

  if (load) return <LoadingPage isInPanel={false} open={load} />;

  return (
    <div className="formComponent-container">
      <form onSubmit={handleSubmit(submit)}>
        <img src="/images/4.png" alt="" />
        <div className="form-header">
          <span>Cadastre-se</span>
          <span>Insira seus dados</span>
        </div>
        <InputGroup
          label="Nome completo"
          writeData={register("name")}
          required={true}
        />
        <InputGroup
          label="Email"
          type="email"
          writeData={register("email")}
          required={true}
        />
        <InputGroup
          label="Confirmar Email"
          type="email"
          writeData={register("confirmEmail")}
          required={true}
        />
        <InputGroup
          label="Senha"
          type="password"
          writeData={register("password")}
          required={true}
        />
        <InputGroup
          label="Confirmar Senha"
          type="password"
          writeData={register("confirmPassword")}
          required={true}
        />
        <hr />
        <span style={{ textAlign: "start", alignSelf: "flex-start" }}>
          Nome da sua loja
        </span>
        <InputGroup
          label="Minha Loja"
          type="text"
          writeData={register("shopName")}
          required={true}
        />
        <span>
          Já possui uma conta? <a href="/auth/login">Entre agora!</a>
        </span>
        <Button
          sx={{
            width: "80%",
            backgroundColor: "#FF0066",
            "&:hover": { backgroundColor: "#FF0066" },
          }}
          variant="contained"
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
