import { InputPhotoDiv, InputImageDiv } from "./styled";
import { useState, useEffect } from "react";
import Icon from "../Icon";

interface InputPhotoPropsType {
  writeData?: any;
  customStyle?: any;
  value?: string;
  fullWidth?: boolean;
}

const InputPhoto = ({ writeData, value, fullWidth, customStyle }: InputPhotoPropsType) => {
  if (fullWidth === undefined || fullWidth === null) {
    fullWidth = false;
  }
  const [imageURL, setImageURL] = useState<string>(
    !fullWidth
      ? value
        ? value
        : "/imgs/blank_profile.png"
      : value
      ? value
      : ""
  );

  const onChange = (e: any) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };
  
  if (!fullWidth) {
    return (
      <InputPhotoDiv>
        <label htmlFor="upload" className="round">
          {
            imageURL == "/imgs/blank_profile.png" ? <div style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}>+</div> : <img src={imageURL} alt="" />
          }
          <input
            id="upload"
            hidden
            {...writeData}
            defaultValue=""
            onChange={(e) => {
              writeData.onChange(e);
              onChange(e);
            }}
            type="file"
          />
        </label>
      </InputPhotoDiv>
    );
  } else {
    return (
      <InputImageDiv>
        <label htmlFor="upload" className="round">
          <img src={imageURL} alt="" />
          {imageURL == "" ? (
            <span>Clique aqui para adicionar uma imagem</span>
          ) : (
            ""
          )}
          <input
            id="upload"
            hidden
            {...writeData}
            defaultValue=""
            onChange={(e) => {
              writeData.onChange(e);
              onChange(e);
            }}
            type="file"
          />
        </label>
      </InputImageDiv>
    );
  }
};

export default InputPhoto;
