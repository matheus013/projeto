import {
  setDocWithRandomUID,
  setDocWithUID,
  getConditionalData,
  getAllData,
} from "@/services/firebase/firestore";
import { Button, Box, ButtonGroup, IconButton } from "@mui/material";
import GenerateForm from "@/components/GenerateForm/GenerateForm";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { createAccount } from "@/services/firebase/auth";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAlertBox } from "@/contexts/AlertContext";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/Icon";

const Clients = () => {
  const [clientPage, setClientPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<any[]>([]);
  const { setAlertOptions } = useAlertBox();
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  const rows = [
    {
      id: 1,
      name: "Ana Julia",
      registerDate: "20/4/2023",
    },
  ];

  const dataGridColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      width: 450,
    },
    {
      field: "registerDate",
      headerName: "Data de cadastro",
      width: 500,
    },
    {
      field: "options",
      headerName: "",
      renderCell: (props) => {
        return (
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div
              style={{
                width: "11px",
                height: "11px",
                backgroundColor: "forestgreen",
                borderRadius: "50%",
              }}
            ></div>
            <div>
              <IconButton>
                <Icon name="visibility" />
              </IconButton>
            </div>
          </div>
        );
      },
    },
  ];

  const getClientsData = async () => {
    let data;
    if (user.accountType === "admin") {
      data = await getAllData("clients");
    } else {
      data = await getConditionalData("clients", user.storeUID, "storeUID");
    }
    setClients(
      await Promise.all(
        data.docs.map(async (doc: any) => {
          const data = doc.data();

          return data;
        })
      )
    );
  };

  useEffect(() => {
    (async function () {
      if (!loading) {
        setLoading(true);
      }

      await getClientsData();
      setLoading(false);
    })();
  }, []);

  const addClient = async (data: any) => {
    try {
      if (data.password === data.confirmPassword) {
        setLoading(true);
        const date = new Date();
        const registerData = {
          email: data.email,
          name: data.name,
          cpfOrCnpj: data.cpfOrCnpj,
          obs: data.obs,
          tel: data.tel,
          registerTime: date.toLocaleDateString("pt-BR"),
          registerHour: String(date.getHours()).padStart(2, "0"),
          registerMin: String(date.getMinutes()).padStart(2, "0"),
          storeUID: user.storeUID
        };
        const newAccount = await createAccount({
          email: registerData.email,
          password: data.password,
        });
        const accountDB = await setDocWithRandomUID("clients", registerData);
        await getClientsData();
        setLoading(false);
        setClientPage(false);
      } else {
        throw new Error("As senhas não conferem!");
      }
    } catch (error: any) {
      setLoading(false);
      setAlertOptions({
        message: typeof error !== "string" ? error.message : error,
        type: "error",
        time: 5000,
        open: true,
      });
    }
  };

  if (clientPage) {
    return (
      <GenerateForm
        formName="Adicionar Cliente"
        onClose={() => setClientPage(false)}
        onSubmit={addClient}
        groups={[
          {
            name: "Informações pessoais",
            fields: [
              {
                name: "Nome completo",
                dataKey: "name",
                required: true,
              },
              {
                name: "E-mail",
                dataKey: "email",
                type: "email",
                required: true,
              },
              {
                name: "CPF / CNPJ",
                dataKey: "cpfOrCnpj",
                required: true,
              },
              {
                name: "Data de nascimento",
                mask: "99/99/9999",
                dataKey: "birthDate",
                required: true,
              },
              {
                name: "Telefone",
                dataKey: "tel",
                required: true,
              },
              {
                style: {
                  gridColumn: "span 2",
                },
                name: "Observações",
                dataKey: "obs",
                isTextarea: true,
              },
            ],
          },
          {
            name: "",
            fields: [
              {
                name: "Senha",
                dataKey: "password",
                type: "password",
                required: true,
              },
              {
                name: "Confirmar senha",
                dataKey: "confirmPassword",
                type: "password",
                required: true,
              },
            ],
          },
        ]}
      />
    );
  }

  let newId = 0;
  const rowsData = clients.map((d: any) => {
    newId += 1;

    return {
      id: newId,
      name: d.name,
      registerDate: d.registerTime,
    };
  });

  if (loading) return <LoadingPage isInPanel={true} open={true} />;

  return (
    <div className="page">
      <div className="page__header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "middle",
            gap: "25px",
          }}
        >
          <h1>Clientes</h1>
        </div>
        <Button
          sx={{
            backgroundColor: currentTheme.primaryColor,
            "&:hover": {
              backgroundColor: currentTheme.primaryColor,
            },
          }}
          variant="contained"
          onClick={() => setClientPage(true)}
        >
          Novo Cliente
        </Button>
      </div>
      <div className="page__main">
        <Box>
          <DataGrid
            rows={rowsData}
            columns={dataGridColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default Clients;
