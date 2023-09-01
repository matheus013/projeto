import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EstadoProvider } from "@/contexts/EstadoContext";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import SelectField from "../SelectField/SelectField";
import { IconButton, Button } from "@mui/material";
import InputGroup from "../InputGroup/InputGroup";
import InputPhoto from "../InputPhoto/InputPhoto";
import Textarea from "../Textarea/Textarea";
import { useTheme } from "@/hooks/useTheme";
import { Fragment, useState } from "react";
import { EditorState } from "draft-js";
import Icon from "../Icon";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface GenerateFormPropsType {
  defaultFormData?: any;
  groups: any;
  hiddenCloseButton?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  render?: (...props: any) => any;
  formName: string;
}

interface GroupsType {
  name?: string;
  style: object;
  parentStyle: object;
  fields: FieldType[];
}

interface FieldType {
  name: string;
  dataKey: string;
  style: object;
  mask?: string | undefined;
  isSelect?: boolean;
  validation: object;
  isImageInput?: boolean;
  customStyle?: any;
  required?: boolean;
  isTextarea?: boolean;
  type?: string;
  isRichText?: boolean;
  renderOptions: () => Promise<JSX.Element>;
  isAutocompleteSelect?: boolean;
}

const GenerateForm = ({
  formName,
  groups,
  defaultFormData,
  onSubmit,
  onClose,
  hiddenCloseButton,
  render,
}: GenerateFormPropsType) => {
  const { currentTheme } = useTheme();
  const { register, handleSubmit, control } = useForm();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(defaultFormData);
  return (
    <EstadoProvider>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form__header">
              <h1>{formName}</h1>
              {!hiddenCloseButton ? (
                <IconButton onClick={onClose}>
                  <Icon name="close" />
                </IconButton>
              ) : (
                ""
              )}
            </div>
            <div>
              {defaultFormData ? (
                render ? (
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {render()}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {groups.map((g: GroupsType) => {
            return (
              <Fragment key={g.name || Date.now()}>
                <div key={""} className="form__group" style={g.parentStyle}>
                  <div className="group__header">
                    {g.name && <h2>{g.name}</h2>}
                  </div>
                  <div style={g.style} className="group__container">
                    {g.fields.map((f: FieldType) => {
                      if (f.isSelect) {
                        return (
                          <div style={f.style} key={f.dataKey}>
                            <SelectField
                              defaultUF={
                                defaultFormData
                                  ? defaultFormData.addressState || null
                                  : null
                              }
                              name={f.dataKey}
                              style={f.style}
                              type={f.type || undefined}
                              fieldName={f.name}
                              value={
                                defaultFormData
                                  ? defaultFormData[f.dataKey]
                                  : ""
                              }
                              renderOptions={f.renderOptions}
                              writeData={register(
                                f.dataKey,
                                f.validation || undefined
                              )}
                            />
                          </div>
                        );
                      } else if (f.isTextarea) {
                        return (
                          <div style={f.style} key={f.dataKey}>
                            <Textarea
                              value={
                                defaultFormData
                                  ? defaultFormData[f.dataKey]
                                  : ""
                              }
                              writeData={register(
                                f.dataKey,
                                f.validation || undefined
                              )}
                              name={f.dataKey}
                              label={f.name}
                            />
                          </div>
                        );
                      } else if (f.isImageInput) {
                        return (
                          <InputPhoto
                            customStyle={f.customStyle}
                            value={
                              defaultFormData ? defaultFormData[f.dataKey] : ""
                            }
                            writeData={register(f.dataKey)}
                          ></InputPhoto>
                        );
                      } else if (f.isRichText) {
                        return (
                          <div style={f.style} key={f.dataKey}>
                            <Controller
                              render={(field) => (
                                <Editor
                                  {...field}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                />
                              )}
                              name={f.dataKey}
                              control={control}
                              defaultValue=""
                            />
                          </div>
                        );
                      }

                      return (
                        <div style={f.style} key={f.dataKey}>
                          <InputGroup
                            value={
                              defaultFormData ? defaultFormData[f.dataKey] : ""
                            }
                            required={f.required || false}
                            writeData={register(
                              f.dataKey,
                              f.validation || undefined
                            )}
                            type={f.type || "text"}
                            name={f.dataKey}
                            label={f.name}
                            mask={f.mask || undefined}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          })}
          <Button
            type="submit"
            sx={{
              width: 300,
              borderRadius: 5,
              backgroundColor: currentTheme.primaryColor,
              color: "white",
              "&: hover": {
                backgroundColor: currentTheme.primaryColor,
              },
            }}
          >
            {defaultFormData ? "Atualizar" : "Adicionar"}
          </Button>
        </form>
      </div>
    </EstadoProvider>
  );
};

export default GenerateForm;
