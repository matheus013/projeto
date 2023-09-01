import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { FloatingLabel } from "./styled";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

interface InputGroupPropsType {
  label?: string;
  mask?: string;
  name?: string;
  value?: string;
  type?: string;
  required?: boolean;
  writeData?: any;
  errors?: any;
  dataKey?: any;
}

const InputGroup = ({
  label,
  writeData,
  type,
  value,
  name,
  required,
  mask,
  errors,
  dataKey,
}: InputGroupPropsType) => {
  const [defaultValue, setDefaultValue] = useState<string | undefined>();
  const { currentTheme } = useTheme();

  useEffect(() => {
    setDefaultValue(value);
  }, [defaultValue, value]);

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
    <Fragment>
      {mask ? (
        <InputMask defaultValue={value} {...writeData} mask={mask}>
          {(inputProps: any) => (
            <TextField
              size="small"
              required={required}
              type={type}
              defaultValue={value}
              {...inputProps}
              fullWidth
              label={label}
              sx={style}
            ></TextField>
          )}
        </InputMask>
      ) : (
        <TextField
          size="small"
          defaultValue={value}
          onChange={(e) => {
            writeData.onChange(e);
          }}
          required={required}
          type={type}
          name={name}
          {...writeData}
          label={label}
          key={name}
          fullWidth
          sx={style}
        />
      )}
      {errors && (
        <ErrorMessage
          name={dataKey}
          errors={errors}
          render={({ message }) => <p>{message}</p>}
        ></ErrorMessage>
      )}
    </Fragment>
  );
};

export default InputGroup;
