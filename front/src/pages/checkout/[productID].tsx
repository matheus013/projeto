import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Select,
} from "@mui/material";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import SelectField from "@/components/SelectField/SelectField";
import InputGroup from "@/components/InputGroup/InputGroup";
import { EstadoProvider } from "@/contexts/EstadoContext";
import { getData } from "@/services/firebase/firestore";
import { getFile } from "@/services/firebase/storage";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface FormDataType {}

const Checkout = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { currentTheme } = useTheme();
  const router = useRouter();

  const [isButtonDisable, setButtonDisable] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "creditCard" | "boleto" | "pix"
  >("creditCard");
  const [loading, setLoading] = useState<boolean>(true);
  const [productData, setProductData] = useState<any>(null);
  const [parcelas, setParcelas] = useState<any>(1);

  const { user } = useAuth();

  useEffect(() => {
    (async function () {
      if (router.isReady) {
        const { productID } = router.query;
        if (productID) {
          await getProductData(productID);
        }
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  const getProductData = async (productID: string | string[]) => {
    const data = await getData("products/", productID);
    if (data && productData === null) {
      data.fileURL = await getFile(`products/${productID}/profile_image`);
      setProductData(data);
    }
    // } else {
    //   router.push("/home");
    // }
  };

  const onSubmit = (data: FormDataType) => {
    console.log(data);
  };

  if (loading) return <LoadingPage open={loading} isInPanel={false} />;

  const array = [];
  for (let i = 1; i <= productData.installment; i++) {
    array.push(i);
  }

  return (
    <Fragment>
      <div className="checkout-page">
        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-header">
            <h3>Dados pessoais</h3>
            <span>Preencha seus dados para ter acesso ao produto.</span>
          </div>
          <div className="checkout-main">
            <InputGroup
              errors={errors}
              dataKey="name"
              required
              label="Nome completo"
              writeData={register("name", {
                required: "Campo obrigatório",
                maxLength: 3,
              })}
            />
            <InputGroup
              errors={errors}
              dataKey="email"
              label="Email"
              required
              writeData={register("email")}
            />
            <InputGroup
              errors={errors}
              dataKey="confirmEmail"
              label="Confime o Email"
              required
              writeData={register("confirmEmail")}
            />
            <InputGroup
              errors={errors}
              dataKey="tel"
              label="Telefone"
              required
              mask="(99) 99999-9999"
              writeData={register("tel")}
            />
            <InputGroup
              errors={errors}
              dataKey="cpfOrCnpj"
              label="Cpf / Cnpj"
              required
              writeData={register("cpfOrCnpj")}
            />
            <div className="checkout-header">
              <h3>Endereço</h3>
              <span>Insira os dados para a entrega do produto.</span>
            </div>
            <InputGroup
              errors={errors}
              dataKey="cep"
              label="CEP"
              required
              mask="99999-999"
              writeData={register("cep")}
            />
            <InputGroup
              errors={errors}
              dataKey="address"
              label="Endereço"
              required
              writeData={register("address")}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 5,
              }}
            >
              <InputGroup
                errors={errors}
                dataKey="addressNumber"
                required
                label="Número"
                writeData={register("addressNumber")}
              />
              <InputGroup
                errors={errors}
                dataKey="complement"
                label="Complemento"
                required
                writeData={register("complement")}
              />
              <InputGroup
                errors={errors}
                dataKey="address"
                label="Endereço"
                required
                writeData={register("address")}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 5,
              }}
            >
              <EstadoProvider>
                <SelectField
                  name="state"
                  size="small"
                  fieldName="Estado"
                  type="estados"
                  writeData={register("state")}
                />
                <div
                  style={{
                    gridColumn: "span 2",
                  }}
                >
                  <SelectField
                    name="city"
                    size="small"
                    fieldName="Cidade"
                    type="cidades"
                    writeData={register("city")}
                  />
                </div>
              </EstadoProvider>
            </div>
            <div className="checkout-header">
              <h3>Pagamento</h3>
              <span>Selecione a forma de pagamento.</span>
            </div>
            <ToggleButtonGroup
              value={paymentMethod}
              defaultValue="creditCard"
              onChange={(e: any, newIdx) => {
                if (newIdx !== null) {
                  setPaymentMethod(e.target.value);
                }
              }}
            >
              <ToggleButton
                sx={{
                  width: 180,
                  "&:checked": {
                    border: "1px solid green",
                  },
                }}
                value="creditCard"
                defaultChecked
              >
                Cartão de crédito
              </ToggleButton>
              <ToggleButton sx={{ width: 180 }} value="boleto">
                Boleto
              </ToggleButton>
              <ToggleButton sx={{ width: 180 }} value="pix">
                PIX
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="payment-method-container">
              {paymentMethod === "creditCard" && (
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <InputGroup
                      mask="9999 9999 9999 9999"
                      label="Número do cartão"
                      writeData={register("creditCardNumber")}
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 5,
                    }}
                  >
                    <InputGroup
                      label="Validade"
                      mask="99/99"
                      writeData={register("validity")}
                    />
                    <InputGroup label="CVV" writeData={register("cvv")} />
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Select
                      fullWidth
                      size="small"
                      sx={{
                        "& label.Mui-focused": {
                          color: "rgb(118, 118, 118)",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: currentTheme.primaryColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: currentTheme.primaryColor,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: currentTheme.primaryColor,
                          },
                        },
                      }}
                      onChange={(e) => setParcelas(e.target.value)}
                      value={parcelas}
                      name="Parcelas"
                    >
                      {array.map((p: any) => [
                        <MenuItem key={p} value={p}>
                          {p < 12 ? `${p}x sem juros` : `${p}x com juros`}
                        </MenuItem>,
                      ])}
                    </Select>
                  </div>
                </div>
              )}
              {paymentMethod === "boleto" ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      border: "1px solid #FF0066",
                      borderBottom: "0.5px solid #ff0066",
                      padding: 20,
                      borderRadius: "10px 10px 0px 0px",
                    }}
                  >
                    <h4>Pague até a data do vencimento</h4>
                    <span>
                      Faça o pagamento dentro do prazo de vencimento em qualquer
                      instituição bancária ou lotérica.
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      border: "1px solid #FF0066",
                      borderTop: "none",
                      padding: 20,
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <h4>Aguarde a compensação</h4>
                    <span>
                      Pagamentos com boleto levam até 3 dias úteis para serem
                      aprovados.
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {paymentMethod === "pix" ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      border: "1px solid #FF0066",
                      borderBottom: "0.5px solid #ff0066",
                      padding: 20,
                      borderRadius: "10px 10px 0px 0px",
                    }}
                  >
                    <h4>Copie os dados de pagamento</h4>
                    <span>
                      Após apertar no botão verde abaixo, você poderá escanear o
                      QR CODE ou copiar o nosso código.
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      border: "1px solid #FF0066",
                      borderTop: "none",
                      padding: 20,
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <h4>Faça o Pagamento</h4>
                    <span>
                      Abra o aplicativo do seu banco, escolha a opção PIX copia
                      e cola e cole o código. Ou escaneie o QR Code.Pronto!Após
                      realizado o pagamento, o sistema processará a compra em
                      alguns segundos.
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Button
            disabled={isButtonDisable}
            sx={{
              backgroundColor: currentTheme.primaryColor,
              color: "white",
              "&:hover": {
                backgroundColor: currentTheme.primaryColor,
              },
            }}
          >
            Finalizar Compra
          </Button>
        </form>
        <div className="product-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <img style={{ width: 250, padding: 2 }} src={productData.fileURL} />
            <h3>{productData.productName}</h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 25,
              marginTop: 10,
            }}
          >
            <div></div>
            <div>
              <h2 style={{ color: "#FF0066" }}>
                {parcelas}x de R${parseInt((parseFloat(productData.buyPrice) / parseInt(parcelas)))}
              </h2>
              {parcelas != 1 ? (
                <span style={{ textAlign: "left" }}>
                  ou R${productData.buyPrice} a vista
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
