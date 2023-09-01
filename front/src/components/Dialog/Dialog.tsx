import {
  Button,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useState, useEffect, Fragment } from "react";
import SelectField from "../SelectField/SelectField";
import InputGroup from "../InputGroup/InputGroup";
import InputPhoto from "../InputPhoto/InputPhoto";
import { useDialog } from "@/hooks/useDialog";
import { useTheme } from "@/hooks/useTheme";
import Textarea from "../Textarea/Textarea";
import { useForm } from "react-hook-form";
import { Backdrop } from "@mui/material";

const Dialog = () => {
  const { register, handleSubmit } = useForm();
  const { dialogOptions, setDialogOptions, handleClose } = useDialog();
  const { currentTheme } = useTheme();

  const [dialog, setDialog] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (dialogOptions.open && dialog == null) {
      if (dialogOptions.type == "alert") {
        setDialog(
          <MUIDialog open={dialogOptions.open}>
            <DialogTitle id="alert-dialog-title">{dialogOptions.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogOptions.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ color: currentTheme.primaryColor }}
                onClick={() => {
                  handleClose();
                  setDialog(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                sx={{ color: currentTheme.primaryColor }}
                onClick={() => {
                  if (dialogOptions.onConfirm)
                    dialogOptions.onConfirm();
                  handleClose()
                  setDialog(null)
                }}
                autoFocus
              >
                Aceitar
              </Button>
            </DialogActions>
          </MUIDialog >
        )
      } else if (dialogOptions.type == "form") {
        setDialog(<MUIDialog
          fullWidth
          open={dialogOptions.open}
          onClose={() => handleClose()}
        >
          <DialogTitle>{dialogOptions.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogOptions.message}</DialogContentText>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
              onSubmit={handleSubmit((data: any) => {
                if (dialogOptions.onConfirm)
                  dialogOptions.onConfirm(data);
                handleClose();
                setDialog(null);
              })}
            >
              {dialogOptions.fields ?
                (
                  dialogOptions.fields.map((f: any) => {
                    if (f.isTextarea) {
                      return (
                        <div key={f.dataKey}>
                          <Textarea
                            value={
                              dialogOptions.data != null
                                ? dialogOptions.data[f.dataKey]
                                : ""
                            }
                            writeData={register(f.dataKey)}
                            label={f.name}
                          />
                        </div>
                      );
                    } else if (f.isSelect) {
                      return (
                        <div key={f.dataKey}>
                          <SelectField
                            fieldName={f.name}
                            value={
                              dialogOptions.data != null
                                ? dialogOptions.data[f.dataKey]
                                : ""
                            }
                            writeData={register(f.dataKey)}
                            renderOptions={f.renderOptions}
                          ></SelectField>
                        </div>
                      );
                    } else if (f.isImageInput) {
                      return (
                        <div style={f.style} key={""}>
                          <InputPhoto
                            value={
                              dialogOptions.data != null
                                ? dialogOptions.data[f.dataKey]
                                : ""
                            }
                            fullWidth={f.fullWidth}
                            writeData={register(f.dataKey)}
                          ></InputPhoto>
                        </div>
                      );
                    }
                    return (
                      <div key={f.dataKey}>
                        <InputGroup
                          value={dialogOptions.data != null ? dialogOptions.data[f.dataKey] : ""}
                          label={f.name}
                          name={f.dataKey}
                          writeData={register(f.dataKey)}
                        />
                      </div>
                    );
                  })
                ) : ""}
              <DialogActions>
                <Button
                  sx={{ color: currentTheme.primaryColor }}
                  onClick={() => {
                    if (dialogOptions.onClose)
                      dialogOptions.onClose();
                    handleClose()
                    setDialog(null)
                  }
                  }
                >
                  {
                    dialogOptions.closeButtonName || "Cancelar"
                  }
                </Button>
                <Button type="submit" sx={{ color: currentTheme.primaryColor }}>
                  {
                    dialogOptions.confirmButtonName || "Adicionar"
                  }
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </MUIDialog >)
      }
    }
  }, [dialog, dialogOptions])

  return <div>{dialog}</div>
}

export default Dialog;
