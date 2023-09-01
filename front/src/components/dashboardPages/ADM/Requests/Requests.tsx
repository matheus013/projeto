import { Box, IconButton, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { useTheme } from "@/hooks/useTheme";
import Icon from "@/components/Icon";

const Requests = () => {
  const { currentTheme } = useTheme();
  const rows = [
    {
      id: 1,
      cardImg: "",
      requestNumber: "602609571853145",
      requestDate: "20/06/2023",
      totalValue: "R$ 300,00",
      status: "Pagamento Aprovado",
    },
  ];

  const dataGridColumns: GridColDef[] = [
    {
      field: "cardImg",
      headerName: "",
      renderCell: () => {
        return <img width="35px" src="/svgs/mastercard.svg" alt="" />;
      },
    },
    {
      field: "requestNumber",
      headerName: "Número do Pedido",
      width: 300,
      renderCell: (props) => {
        console.log(props);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: currentTheme.primaryColor }}>{props.formattedValue}</span>
            <span style={{ fontSize: "13px" }}>Ana Julia Santos</span>
          </div>
        );
      },
    },
    {
      field: "requestDate",
      headerName: "Data",
      renderCell: (props) => {
        console.log(props);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{props.formattedValue}</span>
            <span>--</span>
          </div>
        );
      },
      width: 170,
    },
    {
      field: "totalValue",
      headerName: "Total",
      renderCell: (props) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{props.formattedValue}</span>
            <span>--</span>
          </div>
        );
      },
      width: 170,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: () => {
        return (
          <div
            style={{
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              color: "forestgreen",
              padding: "6px",
              borderRadius: "6px",
            }}
          >
            Pagamento Aprovado
          </div>
        );
      },
      width: 200,
    },
    {
      field: "options",
      headerName: "Entrega",
      renderCell: () => {
        return (
          <ButtonGroup>
            <IconButton>
              <Icon name="call" />
            </IconButton>
            <IconButton>
              <Icon name="local_shipping" />
            </IconButton>
            <IconButton>
              <Icon name="menu_book" />
            </IconButton>
          </ButtonGroup>
        );
      },
      width: 170,
    },
  ];

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
          <h1>Pedidos</h1>
          <span style={{ fontSize: "20px" }}>248 pedidos</span>
        </div>
      </div>
      <div className="page__main">
        <Box>
          <DataGrid
            rows={rows}
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

export default Requests;
