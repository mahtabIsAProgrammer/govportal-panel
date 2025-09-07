import { isArray } from "lodash";
import { useFormik } from "formik";
import { Box, Grid } from "@mui/material";
import { memo, useContext, type FC } from "react";

import {
  CustomTextfield,
  type TCustomTextfield,
} from "../controllers/CustomTextfield";
import {
  CustomAutoComplete,
  type ICustomAutoComplete,
} from "../controllers/CustomAutoComplete";
import { HeaderPage } from "../common/HeaderPage";
import { CustomButton } from "../controllers/CustomButton";
import { Uploader, type IUploader } from "../common/Uploader";
import { MainContext } from "../../helpers/others/mainContext";
import { addEditPrivderSX } from "../../helpers/styles/advance";
import { EditorQuill, type IEditorQuill } from "../common/EditorQuill";
import { CustomSelect, type ICustomSelect } from "../controllers/CustomSelect";

export type TInputTypesObject = {
  TInput: TCustomTextfield;
  TSelect: ICustomSelect;
  TAutoComplete: ICustomAutoComplete;
};

interface IInputs {
  columnGridSize?: TColumnGridSize;
  side?: {
    uploader?: {
      name: string;
      props: IUploader;
    };

    columnGridSize?: TColumnGridSize;
  };
  fields: Array<
    | {
        isFullWidth?: boolean;
        type: "textfield";
        props: TCustomTextfield;
        name: string;
      }
    | {
        isFullWidth?: boolean;
        type: "autocomplete";
        props: ICustomAutoComplete;
        name: string;
      }
    | {
        isFullWidth?: boolean;
        type: "select";
        props: ICustomSelect;
        name: string;
      }
    | {
        isFullWidth?: boolean;
        type: "editorQuill";
        props: IEditorQuill;
        name: string;
      }
  >;
  form: {
    validations: TEmptyFunctionVoid;
    initialValues: Record<string, TAny>;
    onSubmit: (values: TAny) => void;
    onCancel?: () => void;
    loading?: boolean;
  };
}

interface IAddEditProvider {
  title: string;
  breadcrumbs: IBreadcrumbsItems[];
  isEdit?: boolean;
  isLoading: boolean;
  inputs?: IInputs;
}

export const AddEditProvider: FC<IAddEditProvider> = ({
  breadcrumbs,
  // isLoading,
  title,
  inputs,
  isEdit,
}) => {
  const { theme } = useContext(MainContext);

  const formIK = useFormik({
    initialValues: inputs?.form.initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: inputs?.form.validations
      ? inputs?.form.validations()
      : undefined,
    onSubmit: (values: TAny) => {
      return inputs?.form.onSubmit(values);
    },
  });

  return (
    <Grid sx={addEditPrivderSX(theme)}>
      <HeaderPage
        title={isEdit ? "Edit " + title : "Add " + title}
        breadcrumbData={breadcrumbs}
      />
      <Box className="page-container">
        {inputs ? (
          <Box
            className="form-container"
            component="form"
            method="post"
            onSubmit={formIK.handleSubmit}
          >
            <Grid container className="grid-container">
              <Grid container className="inputs-wrapper">
                {inputs.fields.map((field, index) => {
                  return (
                    <InputItems
                      key={index}
                      type={field.type}
                      props={field.props}
                      name={field.name}
                      formIK={formIK}
                      isFullWidth={field.isFullWidth}
                      columnGridSize={inputs.columnGridSize}
                    />
                  );
                })}
              </Grid>
              <Box className="buttons-wrapper">
                <CustomButton
                  type="submit"
                  variant="contained"
                  disabled={inputs.form.loading}
                  text="Submit"
                />

                {inputs.form.onCancel && (
                  <CustomButton
                    text="cancel"
                    variant="outlined"
                    onClick={inputs.form.onCancel}
                  />
                )}
              </Box>
            </Grid>
            {inputs?.side?.uploader && (
              <Uploader
                value={formIK.values[inputs?.side?.uploader.name]}
                onChange={(file) =>
                  formIK.setFieldValue(
                    (inputs?.side?.uploader as TAny).name,
                    file
                  )
                }
                errorMessage={
                  inputs?.side?.uploader.name &&
                  formIK.errors[inputs?.side?.uploader.name]
                    ? {
                        text: formIK.errors[
                          inputs?.side?.uploader.name
                        ] as string,
                        type: "error",
                      }
                    : inputs?.side?.uploader?.props?.errorMessage
                }
                {...inputs?.side?.uploader["props"]}
              />
            )}
          </Box>
        ) : null}
      </Box>
    </Grid>
  );
};

const InputItems = memo(
  ({ type, props, name, formIK, columnGridSize, isFullWidth }: TAny) => {
    let result;

    switch (type) {
      case "textfield":
        result = (
          <CustomTextfield
            fullWidth
            name={name}
            errorMessage={{ text: formIK && formIK.errors[name] }}
            onChange={formIK.handleChange}
            value={formIK.values[name] || ""}
            {...props}
          />
        );
        break;

      case "autocomplete":
        result = (
          <CustomAutoComplete
            isOptionEqualToValue={({ label }, value) =>
              label.toString() == value.toString()
            }
            onChange={(_, newValue) => {
              const values = isArray(newValue)
                ? newValue?.map((item: TAny) =>
                    typeof item === "string" ? item : item.value
                  )
                : newValue;
              formIK.setFieldValue(name, (values as IOption)?.value);
            }}
            value={formIK.values[name] || ""}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                  }
                : props?.errorMessage
            }
            {...(props ?? { options: [] })}
          />
        );
        break;

      case "select":
        result = (
          <CustomSelect
            name={name}
            value={(formIK && formIK.values[name]) ?? ""}
            onChange={formIK && formIK.handleChange}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                  }
                : props?.errorMessage
            }
            {...(props ?? { items: [] })}
          />
        );
        break;

      case "editorQuill":
        result = (
          <EditorQuill
            value={formIK && formIK.values[name]}
            onChange={(value) => formIK && formIK.setFieldValue(name, value)}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    message: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["editorQuill"]?.errorMessage
            }
            {...(props?.["editorQuill"] ?? {})}
          />
        );
        break;

      default:
        break;
    }
    return (
      <>
        <Grid
          size={{
            md: isFullWidth ? 12 : columnGridSize ?? 5.9,
            lg: isFullWidth ? 12 : columnGridSize ?? 5.9,
            sm: 12,
            xs: 12,
          }}
        >
          {result}
        </Grid>
      </>
    );
  }
);
