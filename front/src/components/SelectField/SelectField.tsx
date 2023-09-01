import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useEstado } from "@/contexts/EstadoContext";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

interface SelectFieldPropsType {
  fieldName: string;
  children?: any;
  writeData?: any;
  name?: string;
  style?: object;
  defaultUF?: string;
  icon?: string;
  size?: string;
  onChange?: (...any: any) => any; 
  type?: string;
  value?: string;
  renderOptions?: () => Promise<JSX.Element>;
}

const SelectField = ({
  fieldName,
  name,
  writeData,
  value,
  type,
  size,
  defaultUF,
  onChange,
  renderOptions,
}: SelectFieldPropsType) => {
  const { uf, changeUF } = useEstado();
  const { currentTheme } = useTheme();

  const [options, setOptions] = useState<any>(null);

  useEffect(() => {
    (async function () {
      if(defaultUF != null && defaultUF != undefined){
        changeUF(defaultUF);
      }
      
      if (
        renderOptions != undefined ||
        (renderOptions != null && type == undefined)
        ) {
        const allOptions = await renderOptions();
        setOptions(allOptions);
      }
      if (type == "estados") {
        const data = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
        const json = await data.json();
        setOptions(
          json.map((estado: any) => (
            <MenuItem key={estado.sigla} value={estado.sigla}>
              {estado.nome}
            </MenuItem>
          ))
        );
      }

      if (type == "cidades") {
        if (uf != "") {
          const data = await fetch(
            `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`
          );
          const json = await data.json();
          setOptions(
            json.map((cidades: any) => (
              <MenuItem key={cidades.nome} value={cidades.nome}>
                {cidades.nome}
              </MenuItem>
            ))
          );
        }
      }
    })();
  }, [uf]);

  const style = {
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
  };

  return (
    <TextField
      size={size || "small"}
      sx={style}
      fullWidth
      defaultValue={value || ""}
      label={fieldName}
      select
      {...writeData}
      onChange={type == "estados" ? (e) => {
        changeUF(e.target.value)
      } : undefined}
    >
      {options || <MenuItem>Sem Opções</MenuItem>}
    </TextField>
  );
};

export default SelectField;
