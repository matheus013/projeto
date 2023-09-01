import { Box, IconButton, Button, ButtonGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { useTheme } from "@/hooks/useTheme";

const AbandonedCarts = () => {
  const { currentTheme } = useTheme();

  const rows = [{
    id: 1,
    cartNumber: "#364124563",
    createDate: "20/6/2022",
    abandonedTime: "Entregas",
    client: "Ana Julia",
    recuperation: "1/4",
    totalValue: "300,00",
  }]

  const dataGridColumns: GridColDef[] = [
    {
      field: "cartNumber",
      headerName: "Carrinho",
      renderCell: (props) => {
        return <span style={{
          color: currentTheme.primaryColor,
        }}>{props.formattedValue}</span>
      },
      width: 300,
    },
    {
      field: "createDate",
      headerName: "Criado em",
      renderCell: (props) => {
        console.log(props)
        return <div style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <span>{props.formattedValue}</span>
          <span>--</span>
        </div>
      },
      width: 170,
    },
    {
      field: "client",
      headerName: "Clinte",
      width: 170
    },
    {
      field: "abandonedTime",
      headerName: "Abandonou em",
      width: 200
    },
    {
      field: "recuperation",
      headerName: "Recuperação",
      renderCell: (props) => {
        return <span>{props.formattedValue + " tentativas"}</span>
      },
      width: 150
    },
    {
      field: "totalValue",
      headerName: "Valor",
      renderCell: (props) => {
        return <span style={{
          color: currentTheme.primaryColor,
        }}>R$ {props.formattedValue}</span>
      },
    }
  ]

  return (
    <div className="page">
      <div className="page__header">
        <div style={{
          display: "flex",
          alignItems: "center",
          verticalAlign: "middle",
          gap: "25px"
        }}>
          <h1>Carrinhos abandonados</h1>
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
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default AbandonedCarts;