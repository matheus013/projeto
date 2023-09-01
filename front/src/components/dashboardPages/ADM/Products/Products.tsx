import {
  deleteAllCompanyUsers,
  deleteDocData,
  updateData,
  getAllData,
  getConditionalData,
} from "@/services/firebase/firestore";
import { Button, Box, ButtonGroup, IconButton, MenuItem } from "@mui/material";
import { deleteFile, setFile, getFile } from "@/services/firebase/storage";
import { setDocWithRandomUID } from "@/services/firebase/firestore";
import GenerateForm from "@/components/GenerateForm/GenerateForm";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAlertBox } from "@/contexts/AlertContext";
import { useDialog } from "@/hooks/useDialog";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/Icon";
import Link from "next/link";

const Products = () => {
  const { setDialogOptions, handleClose } = useDialog();
  const { setAlertOptions } = useAlertBox();
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  const [productsPage, setProductsPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});

  const dataGridColumns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Nome",
      width: 350,
    },
    {
      field: "stockCount",
      headerName: "Qtd. Em Estoque",
      width: 300,
    },
    {
      field: "registerTime",
      headerName: "Criado em",
      width: 300,
    },
    {
      field: "options",
      headerName: "",
      renderCell: (props: any) => {
        return (
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                console.log(products[props.id - 1]);
                setProduct(products[props.id - 1]);
                setProductsPage(true);
              }}
            >
              <Icon name="visibility" />
            </IconButton>
            <IconButton
              onClick={() => openDeleteDialog(products[props.id - 1])}
            >
              <Icon name="delete" />
            </IconButton>
            <div
              style={{
                width: "11px",
                height: "11px",
                backgroundColor: "forestgreen",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    (async function () {
      if (!loading) {
        setLoading(true);
      }

      await getProductsData();
      setLoading(false);
    })();
  }, []);

  const getProductsData = async () => {
    let data;

    if (user.accountType === "admin") {
      data = await getAllData("products");
    } else {
      data = await getConditionalData("products", user.storeUID, "storeUID");
    }
    setProducts(
      await Promise.all(
        data.docs.map(async (doc: any) => {
          const data = doc.data();
          data.fileURL = await getFile(`products/${data.uid}/profile_image`);
          return data;
        })
      )
    );
  };

  const openDeleteDialog = (data: any) => {
    setDialogOptions({
      open: true,
      title: `Tem certeza que deseja deletar o produto: ${data.productName}`,
      message:
        "Ao deletar o produto todas as informações referentes a ele serão perdidas, a operação é irreversível. ",
      type: "alert",
      onConfirm: async () => await deleteProduct(data),
    });
  };

  const deleteProduct = async (data: any) => {
    deleteDocData("products/", data.uid).then(async () => {
      setAlertOptions({
        open: true,
        type: "success",
        message: "Clínica deletada com sucesso.",
        time: 3000,
      });
      setLoading(true);
      await deleteFile(`products/${data.uid}/profile_image`);
      await getProductsData();
      setLoading(false);
      handleClose();
    });
  };

  const addProduct = async (data: any) => {
    if (product === null) {
      try {
        setLoading(true);
        const currentDate = new Date();
        const dataToSend = {
          ...data,
          registerTime: currentDate.toLocaleDateString("pt-BR"),
          registerMin: String(currentDate.getMinutes()).padStart(2, "0"),
          registerHour: currentDate.getHours(),
          storeUID: user.storeUID,
        };
        delete dataToSend.photo;
        const request = await setDocWithRandomUID("products", dataToSend);
        if (data.photo.length > 0) {
          await setFile(`products/${request.uid}/profile_image`, data.photo[0]);
        }
        await getProductsData();
        setAlertOptions({
          type: "success",
          open: true,
          time: 4000,
          message: "Produto cadastrado com sucesso!",
        });
        setLoading(false);
        setProductsPage(false);
      } catch (error: any) {
        setAlertOptions({
          type: "error",
          open: true,
          time: 4000,
          message: error.message || error,
        });
      }
    } else {
      try {
        const dataToUpdate = { ...data };
        delete dataToUpdate.photo;
        await updateData("products", product.uid, dataToUpdate);
        if (data.photo.length > 0) {
          await setFile(`products/${product.uid}/profile_image`, data.photo[0]);
        }
        await getProductsData();
        setProductsPage(false);
        setLoading(false);
        setAlertOptions({
          open: true,
          message: "Produto atualizado com sucesso",
          type: "success",
          time: 3000,
        });
      } catch (error: any) {
        setAlertOptions({
          type: "error",
          message: error.message || error,
          time: 13000,
          open: true,
        });
        setLoading(false);
      }
    }
  };

  let newId = 0;
  const rows = products.map((d: any) => {
    newId += 1;
    return {
      id: newId,
      productName: d.productName,
      stockCount: d.stockCount,
      registerTime: d.registerTime,
    };
  });

  if (loading) return <LoadingPage isInPanel open={loading} />;

  if (productsPage) {
    return (
      <GenerateForm
        formName="Adicionar Produto"
        onClose={() => setProductsPage(false)}
        onSubmit={addProduct}
        render={() => (
          <Button
            sx={{
              backgroundColor: currentTheme.primaryColor,
              "&:hover": {
                backgroundColor: currentTheme.primaryColor,
              },
            }}
            variant="contained"
          >
            {product ? (
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                target="_blank"
                href={`checkout/${product.uid}`}
              >
                Visualizar Checkout
              </Link>
            ) : (
              ""
            )}
          </Button>
        )}
        defaultFormData={product || false}
        groups={[
          {
            name: "Informações do produto",
            fields: [
              {
                name: "Nome do produto",
                dataKey: "productName",
                required: true,
              },
              {
                name: "Garantia em meses",
                dataKey: "tes",
                type: "number",
                required: true,
              },
              {
                name: "Quantidade em estoque",
                dataKey: "stockCount",
                type: "number",
                required: true,
              },
              {
                name: "Descrição",
                dataKey: "desc",
                isRichText: true,
                style: {
                  gridColumn: "span 2",
                },
              },
            ],
          },
          {
            name: "Pagamento e parcelamento",
            fields: [
              {
                name: "Preço de custo",
                dataKey: "costPrice",
                required: true,
              },
              {
                name: "Preço de venda",
                dataKey: "buyPrice",
                required: true,
              },
              {
                name: "Preço promocional",
                dataKey: "promoPrice",
                required: true,
              },
              {
                name: "Parcelamento",
                dataKey: "installment",
                isSelect: true,
                renderOptions: () => {
                  const array = [];
                  for (let i = 1; i <= 36; i++) {
                    array.push(i);
                  }

                  return [
                    array.map((p) => {
                      return (
                        <MenuItem key={p} value={p}>
                          {p < 12 ? `${p}x sem juros` : `${p}x com juros`}
                        </MenuItem>
                      );
                    }),
                  ];
                },
              },
            ],
          },
          {
            name: "Peso e Dimensões",
            fields: [
              {
                name: "Peso",
                dataKey: "weight",
              },
              {
                name: "Largura",
                dataKey: "width",
              },
              {
                name: "Altura",
                dataKey: "height",
              },
              {
                name: "Comprimento",
                dataKey: "length",
              },
            ],
          },
          {
            name: "Imagens",
            fields: [
              {
                name: "foto",
                dataKey: "photo",
                style: {
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
                isImageInput: true,
              },
            ],
          },
        ]}
      />
    );
  }

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
          <h1>Produtos</h1>
          <span style={{ fontSize: "20px" }}>{products.length}</span>
        </div>
        <Button
          sx={{
            backgroundColor: currentTheme.primaryColor,
            "&:hover": {
              backgroundColor: currentTheme.primaryColor,
            },
          }}
          variant="contained"
          onClick={() => {
            setProduct(null);
            setProductsPage(true);
          }}
        >
          Novo Produto
        </Button>
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

export default Products;
