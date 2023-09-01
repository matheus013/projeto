import { useAlertBox } from "@/contexts/AlertContext";
import { Snackbar, Alert } from "@mui/material";
import { Fragment } from "react";

interface AlertBoxPropsType {
  type?: string;
}

const AlertBox = ({ type }: AlertBoxPropsType) => {
  const { alertOptions, setAlertOptions } = useAlertBox();

  return (
    <Fragment>
      <Snackbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alertOptions.open}
        onClose={() =>
          setAlertOptions({
            open: false,
            type: alertOptions.type,
            time: alertOptions.time,
            message: "",
          })
        }
        autoHideDuration={alertOptions.time}
      >
        <Alert
          variant="filled"
          severity={alertOptions.type}
          sx={{ width: 600 }}
        >
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default AlertBox;
