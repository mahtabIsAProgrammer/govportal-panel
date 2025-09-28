import { isFunction } from "lodash";
import { Collapse, Grid } from "@mui/material";
import { useFormik, type FormikHelpers } from "formik";
import { memo, useContext, useRef, type ReactNode } from "react";

import {
  checkSubmitValue,
  checkUndefiendOrNull,
} from "../../helpers/utils/values";
import { SPACE_XL } from "../../helpers/constants/spaces";
import { CustomDialog } from "../controllers/CustomDialog";
import { MainContext } from "../../helpers/others/mainContext";
import { InputsBox, type TFullInputsAddEdit } from "./AddEditProvider";
import { CustomButton, CustomLoadingButton } from "../controllers/CustomButton";

interface IFromModalProvider<T, TFormikHelpers> {
  size?: TDialogSize;
  texts: {
    title: string;
    subtitle?: string;
    cancelButton?: string;
    submitButton?: string;
  };
  forms: {
    validationFunctions?: () => object;
    initialValues: TAny;
    onSubmit: (
      values: TAny,
      formikHelpers: TFormikHelpers
    ) => void | Promise<TAny>;
    loading: boolean;
  };
  inputs: T[] | ((formIK: TAny) => T[]);
  open: boolean;
  columnGridSize?: TColumnGridSize;
  onClose: TEmptyVoidFunction;
  image?: ReactNode | string;
}

export const FromModalProvider = memo<
  IFromModalProvider<TFullInputsAddEdit, FormikHelpers<TAny>>
>(
  ({
    size,
    texts: { title, subtitle, submitButton, cancelButton },
    forms: { validationFunctions, initialValues, onSubmit, loading },
    inputs,
    columnGridSize,
    open,
    onClose,
    image,
  }) => {
    const { isLoadingUploader } = useContext(MainContext);
    const formIK = useFormik({
      initialValues,
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: validationFunctions ? validationFunctions() : undefined,
      onSubmit: (values: TAny, formikHelpers: FormikHelpers<TAny>) => {
        const finalValues = checkSubmitValue(values);
        return onSubmit(finalValues, formikHelpers);
      },
    });
    const ref = useRef(null);
    const inputsBase = checkUndefiendOrNull(inputs)
      ? []
      : isFunction(inputs)
      ? inputs(formIK)
      : inputs;
    return (
      <CustomDialog
        size={size ?? "small"}
        sx={{
          "& .uploader-container": {
            backgroundColor: "transparent",
            p: 0,
            pb: "20px",
            boxShadow: "unset",
          },
          "& .MuiDialogContent-root": {
            width: "100%",
            p: 0,
            "& .MuiCollapse-root": {
              px: undefined,
            },
          },
          "& .dialog-action-box ": {
            p: 0,
          },
          "& .header-title": {
            // justifyContent: "center",
            // position: "relative",
            // height: "32px",
            "& .icon-close-btn": {
              left: "15px",
            },
          },
        }}
        open={open}
        onClose={onClose}
        dialogTitle={{
          subtitle: subtitle,
          hasCloseIcon: true,
          closeIconHandler: (() => onClose()) as TAny,
          titleText: title,
          image: image,
        }}
        content={
          <form
            style={{ width: "100%", maxHeight: "450px" }}
            onSubmit={formIK.handleSubmit}
          >
            <Grid
              container
              sx={{
                width: "100%",
                gap: SPACE_XL,
              }}
              className="action-from-modal-provider-wrapper-inputs"
              component="div"
              ref={ref}
            >
              <Grid container size={{ md: 12 }}>
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{ width: "100%" }}
                >
                  <InputsBox
                    formIK={formIK}
                    inputs={inputsBase}
                    columnGridSize={columnGridSize}
                  />
                </Collapse>
              </Grid>
            </Grid>
          </form>
        }
        dialogAction={
          <Grid
            size={{ md: 12 }}
            sx={{
              gap: "20px",
              display: "flex",
              p: 0,
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              text={cancelButton ?? "cancel"}
              variant="outlined"
              sx={{ width: "100%" }}
              onClick={(() => onClose()) as TAny}
            />
            <CustomLoadingButton
              // type="submit"
              text={submitButton ?? "confirm"}
              variant="contained"
              loading={loading}
              onClick={() => formIK.handleSubmit()}
              // onClick={formIK.handleSubmit}
              disabled={isLoadingUploader}
              sx={{ width: "100%" }}
            />
          </Grid>
        }
      />
    );
  }
);
