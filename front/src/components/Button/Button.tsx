import {Button as MUIButton} from "@mui/material"

interface ButtonProps {
  backgroundColor?: string;
  width?: string;
  content: string;
};

const Button = ({backgroundColor, content, width} : ButtonProps) => {
  return <MUIButton sx={{
    backgroundColor: backgroundColor || "black", 
    width: width || "100%",
    "&:hover": {
      backgroundColor: backgroundColor || "black"
    }
  }}>
    {content}
  </MUIButton>

}