import { useTheme } from "@/hooks/useTheme";
import { TextField } from "@mui/material";

interface TextareaPropsType {
  rows?: number;
  columns?: number;
  value?: string;
  name?: string;
  label?: string;
  writeData?: any;
}

const Textarea = ({
  rows,
  columns,
  name,
  label,
  value,
  writeData,
}: TextareaPropsType) => {
  const { currentTheme } = useTheme();

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
      sx={style}
      rows={10}
      name={name}
      fullWidth
      defaultValue={value}
      multiline
      label={label}
      {...writeData}
    ></TextField>
  );
};

export default Textarea;
