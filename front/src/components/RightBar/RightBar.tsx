import { updateData } from "@/services/firebase/firestore";
import { deleteFile } from "@/services/firebase/storage";
import { setFile } from "@/services/firebase/storage";
import InputPhoto from "../InputPhoto/InputPhoto";
import { Backdrop, Button } from "@mui/material";
import { useSidebar } from "@/hooks/useSidebar";
import { useTheme } from "@/hooks/useTheme";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

interface RightBarPropsData {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const RightBar = ({ open, setOpen }: RightBarPropsData) => {
  const { setImageBrand } = useSidebar();
  const { currentTheme, setTheme } = useTheme();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();

  const [primaryColor, setPrimaryColor] = useState<string>(
    currentTheme.primaryColor
  );
  const [sidebarBG, setSidebarBG] = useState<string>(
    currentTheme.sidebar.backgroundColor
  );

  const [imageURL, setImageURL] = useState<string>("");

  const onChange = (e: any) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const onSave = async (data: any) => {
    setTheme(currentTheme);
    setImageURL("");
    if (data.photo.length > 0) {
      setImageBrand(URL.createObjectURL(data.photo[0]));
    }
    if (user) {
      updateData("Stores", user.storeUID, {
        theme: currentTheme,
      }).then(() => {
        setOpen(false);
      });
      if (data.photo.length > 0) {
        await setFile(`Stores/${user.storeUID}/logo`, data.photo[0]);
      }
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ "z-index": 1 }}
        open={open}
        onClick={() => setOpen(false)}
      />
      <div
        style={{ zIndex: 1 }}
        className={open ? "right-sidebar active" : "right-sidebar"}
      >
        <h3>Personalização</h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          className="sidebar__wrapper"
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={handleSubmit(onSave)}
          >
            <div className="inputColor-container">
              <div className="inputColor-group">
                <input
                  id="primary-color"
                  type="color"
                  onChange={(e) => {
                    setPrimaryColor(e.target.value);
                    currentTheme.primaryColor = e.target.value;
                  }}
                  value={primaryColor}
                />
                <label htmlFor="primary-color">Cor dos detalhes</label>
              </div>
              <div className="inputColor-group">
                <input
                  type="color"
                  onChange={(e) => {
                    setSidebarBG(e.target.value);
                    currentTheme.sidebar.backgroundColor = e.target.value;
                  }}
                  value={sidebarBG}
                />
                <label htmlFor="sidebar-bg">Cor da barra lateral</label>
              </div>

              <h3>Logomarca</h3>
              {open ? (
                <InputPhoto
                  writeData={register("photo")}
                  fullWidth
                ></InputPhoto>
              ) : (
                ""
              )}
              <span
                className="delete-logo"
                onClick={async () => {
                  await deleteFile(
                    `Stores/${user?.storeUID}/logo`
                  );
                  setImageBrand("");
                  setImageURL("");
                }}
              >
                Remover logo
              </span>
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: currentTheme.primaryColor,
                "&:hover": {
                  backgroundColor: currentTheme.primaryColor,
                },
              }}
            >
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
