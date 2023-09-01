import LoadingPage from "@/components/LoadingPage/LoadingPage";
import InputGroup from "@/components/InputGroup/InputGroup";
import { requestSignIn } from "@/services/firebase/auth";
import { useAlertBox } from "@/contexts/AlertContext";
import { FieldValues } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useTheme } from "@/hooks/useTheme";
import { useState, Fragment } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Router from "next/router";

const LoginForm = () => {
  const [load, setLoad] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const { setAlertOptions } = useAlertBox();
  const { currentTheme } = useTheme();
  const { signIn } = useAuth();

  const submit = async (data: FieldValues) => {
    setLoad(true);
    signIn({ email: data.email, password: data.password }).then((userCredentials) => {
      setLoad(false);
      Router.push("/home");
    }).catch((error: FirebaseError) => {
      setLoad(false);
      setAlertOptions({
        type: "error",
        message: error.message,
        time: 2000,
        open: true
      })
    })
  };

  if (load) return <LoadingPage open={load} isInPanel={false}/>

  return (
    <div className="formComponent-container">
      <form onSubmit={handleSubmit(submit)}>
        <img src="/images/4.png" alt="" />
        <div className="form-header">
          <span>Faça log-in</span>
          <span>Insira seus dados</span>
        </div>
        <InputGroup label="Email" type="email" writeData={register("email")} required={true} />
        <InputGroup label="Senha" type="password" writeData={register("password")} required={true} />
        <span>Não tem uma conta? <a href="/auth/register">Crie uma já!</a></span>
        <Button sx={{
          width: "80%",
          backgroundColor: "#FF0066",
          "&:hover": { backgroundColor: "#FF0066" }
        }} variant="contained" type="submit">Entrar</Button>
      </form>

    </div>
  )
};

export default LoginForm;