import {
  memo,
  useMemo,
  Fragment,
  useState,
  type JSX,
  useContext,
  useCallback,
} from "react";
import { isFunction, map } from "lodash";
import { useFormik, type FormikHelpers } from "formik";
import { Fade, Grid, type SxProps, type Theme } from "@mui/material";

import {
  arrayToCommaString,
  commaStringToArray,
} from "../../helpers/utils/array";
import {
  checkSubmitValue,
  checkUndefiendOrNull,
} from "../../helpers/utils/values";
import {
  CustomRadioGroup,
  type ICustomRadioGroup,
} from "../controllers/CustomRadio";
import {
  DateFormatIsoMOMENT,
  DatePickerComponentObject,
  DateTimeFormatIsoMOMENT,
  DateTimePickerComponentObject,
} from "../../helpers/utils/dateTime";
import {
  CustomCheckbox,
  type ICustomCheckbox,
} from "../controllers/CustomCheckbox";
import {
  CustomTextfield,
  type TCustomTextfield,
} from "../controllers/CustomTextfield";
import {
  CustomTimePicker,
  type ICustomDatePicker,
  type ICustomTimePicker,
  type ICustomDateTimePicker,
} from "../controllers/CustomDatePicker";
import {
  CustomAutocomplete,
  type ICustomAutocomplete,
} from "../controllers/CustomAutocomplete";
import { HeaderPage } from "../common/Header";
import { FileUploader } from "../common/Uploader";
import { LoadingAddEdit } from "../common/Loading";
import { SPACE_MD } from "../../helpers/constants/spaces";
import { ProfileUploader } from "../common/ProfileUploader";
import { MainContext } from "../../helpers/others/mainContext";
import { CustomDialogMessage } from "../common/CustomDialogMessages";
import { CustomSelect, type ICustomSelect } from "../controllers/CustomSelect";
import { CustomButton, CustomLoadingButton } from "../controllers/CustomButton";
import {
  addEditProviderSX,
  formButtonsSX,
} from "../../helpers/styles/advances";

export type TPropsInputTypesObject = {
  TSelect: ICustomSelect;
  TInput: TCustomTextfield;
  TCheckbox: ICustomCheckbox;
  TRadioGroup: ICustomRadioGroup;
  TDatePicker: ICustomDatePicker;
  TTimePicker: ICustomTimePicker;
  TAutocomplete: ICustomAutocomplete;
  TDateTimePicker: ICustomDateTimePicker;
};

export type TFullInputsAddEdit = IInputsAddEdit<
  TPropsInputTypesObject,
  SxProps<Theme>
>;

export const AddEditProvider = memo<
  IAddEditProvider<TFullInputsAddEdit, FormikHelpers<TAny>>
>(
  ({
    breadcrumbs,
    forms: { initialValues, loading, onCancel, onSubmit, validationFunctions },
    isLoading,
    options: {
      content: { CustomSections, normalContent },
    },
    texts: { title, cancelText, submitText },
  }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

    const NormalContentCallBack: () => INormalContentAddEdit<TFullInputsAddEdit> =
      useCallback(
        () =>
          normalContent
            ? isFunction(normalContent)
              ? normalContent(formIK)
              : normalContent
            : { inputs: [] },
        [formIK, normalContent]
      );

    const normalContentInputsCallBack = useCallback(() => {
      const pageMain = NormalContentCallBack();

      return checkUndefiendOrNull(pageMain.inputs)
        ? []
        : isFunction(pageMain.inputs)
        ? pageMain.inputs(formIK)
        : pageMain.inputs;
    }, [NormalContentCallBack, formIK]);

    const ContentPage = useCallback(() => {
      const normalContent = NormalContentCallBack();
      const normalContnetInputs = normalContentInputsCallBack();
      return (
        <>
          {normalContnetInputs.length > 0 && (
            <AddEditProviderContent
              sideData={normalContent?.side}
              content={
                <InputsBox
                  formIK={formIK}
                  inputs={normalContnetInputs}
                  columnGridSize={normalContent?.columnGridSize}
                />
              }
              formIK={formIK}
            />
          )}
          {normalContnetInputs.length > 0 && <></>}
          <Fade in={!isLoading && CustomSections !== undefined}>
            <Grid container size={{ xs: 12 }}>
              {CustomSections}
            </Grid>
          </Fade>
        </>
      );
    }, [
      CustomSections,
      NormalContentCallBack,
      formIK,
      isLoading,
      normalContentInputsCallBack,
    ]);

    const formButtons = useMemo(
      () =>
        isLoading ? undefined : (
          <Grid size={{ md: 12 }} sx={formButtonsSX}>
            {onCancel && (
              <CustomButton
                text={cancelText || "cancel"}
                variant="outlined"
                onClick={() => setOpenDeleteDialog(true)}
                disabled={isLoadingUploader || loading}
              />
            )}

            <CustomDialogMessage
              type="other"
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
              loading={isLoading}
              texts={{
                title: "cancel",
                subtitle:
                  "Are you sure to cancel, the entered information will be lost ?",
                content:
                  "Are you sure to cancel, the entered information will be lost ?",
              }}
              onSubmit={async () => (
                setOpenDeleteDialog(false), onCancel && onCancel(formIK)
              )}
            />

            <CustomLoadingButton
              type="submit"
              text={submitText || "save"}
              variant="contained"
              disabled={isLoadingUploader}
              loading={loading}
            />
          </Grid>
        ),
      [
        cancelText,
        formIK,
        isLoading,
        isLoadingUploader,
        loading,
        onCancel,
        openDeleteDialog,
        submitText,
      ]
    );

    return (
      <Grid container sx={addEditProviderSX}>
        {isLoading && <LoadingAddEdit />}
        {title && breadcrumbs && (
          <HeaderPage title={title} breadcrumbData={breadcrumbs} />
        )}
        <form style={{ width: "100%" }} onSubmit={formIK.handleSubmit}>
          <Grid container className="content-page">
            {ContentPage()}
          </Grid>
          {formButtons}
        </form>
      </Grid>
    );
  }
);

export const AddEditProviderContent = memo<
  IAddEditProviderContent<TFullInputsAddEdit>
>(({ content, formIK, sideData, withoutSideNav }) => {
  const hasinputSidebar = sideData?.inputs && sideData?.inputs?.length > 0;
  const hasSidebar =
    hasinputSidebar ||
    (sideData?.fileUploader?.length ?? 0) > 0 ||
    sideData?.QrCodeBox ||
    sideData?.profileUploader;
  return (
    <Grid
      container
      className="wrapper"
      spacing={SPACE_MD}
      component="div"
      tabIndex={1}
    >
      <Grid
        size={{
          lg: hasSidebar ? (withoutSideNav ? 9 : 9.2) : 12,
        }}
      >
        <Grid
          width="100%"
          sx={{
            justifyContent: "space-between",
            "& .uploader-container": {
              boxShadow: "none !important",
              padding: "0px !important",
              mb: SPACE_MD,
            },
          }}
          container
          className="inputs-box"
        >
          {content}
        </Grid>
      </Grid>
      {hasSidebar && (
        <Grid
          size={{
            lg: withoutSideNav ? 3 : 2.8,
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: SPACE_MD,
          }}
        >
          {hasinputSidebar && (
            <Grid
              className="inputs-box"
              container
              width="100%"
              sx={{
                "& .uploader-container": {
                  boxShadow: "none !important",
                  padding: "0px !important",
                  mb: SPACE_MD,
                },
              }}
            >
              <InputsBox
                formIK={formIK}
                inputs={sideData?.inputs ?? []}
                columnGridSize={sideData?.columnGridSize}
              />
            </Grid>
          )}
          {sideData?.profileUploader && (
            <ProfileUploader
              {...(sideData?.profileUploader.props ?? {})}
              defaultValue={
                formIK.values[sideData?.profileUploader.name] ?? undefined
              }
              filesState={(value) =>
                sideData?.profileUploader &&
                sideData?.profileUploader.name &&
                formIK.values[sideData?.profileUploader.name] !== value &&
                formIK.setFieldValue(sideData?.profileUploader.name, value)
              }
              thumbnailsState={(value) =>
                sideData?.profileUploader &&
                sideData?.profileUploader?.thumbName &&
                formIK.values[sideData?.profileUploader?.thumbName] !== value &&
                formIK.setFieldValue(
                  sideData?.profileUploader?.thumbName,
                  value
                )
              }
              errorMessage={
                sideData?.profileUploader.name &&
                formIK.errors[sideData?.profileUploader.name]
                  ? {
                      text: formIK.errors[
                        sideData?.profileUploader.name
                      ] as string,
                      type: "error",
                    }
                  : sideData?.profileUploader?.props?.errorMessage
              }
            />
          )}
          {sideData?.fileUploader &&
            sideData?.fileUploader?.length > 0 &&
            map(
              sideData?.fileUploader,
              ({ name, props, thumbName }, key: number) => (
                <FileUploader
                  key={key}
                  {...(props ?? {})}
                  defaultFiles={
                    formIK.values[name]
                      ? (commaStringToArray(formIK.values[name]) as string[])
                      : undefined
                  }
                  filesState={(value) =>
                    sideData?.fileUploader &&
                    name &&
                    (formIK.values[name] || "") !== arrayToCommaString(value) &&
                    formIK.setFieldValue(name, arrayToCommaString(value))
                  }
                  thumbnailsState={(value) =>
                    sideData?.fileUploader &&
                    thumbName &&
                    (formIK.values[thumbName] || "") !=
                      arrayToCommaString(value) &&
                    formIK.setFieldValue(thumbName, arrayToCommaString(value))
                  }
                  errorMessage={
                    name && formIK.errors[name]
                      ? {
                          message: formIK.errors[name] as string,
                          type: "error",
                        }
                      : props?.errorMessage
                  }
                />
              )
            )}
          {/* {sideData?.QRCodeBox && (
            <QRcodeBox
              {...(sideData?.QRCodeBox?.props ?? {})}
              value={
                sideData?.QRCodeBox?.name
                  ? formIK.values[sideData?.QRCodeBox?.name] ?? ""
                  : sideData?.QRCodeBox?.props?.value ?? ""
              }
            />
          )} */}
        </Grid>
      )}
    </Grid>
  );
});

export const InputsBox = memo<{
  inputs: TFullInputsAddEdit[];
  columnGridSize: TColumnGridSize;
  formIK?: TAny;
}>(({ columnGridSize, inputs, formIK }) => {
  return (
    <>
      {map(
        inputs,
        (
          {
            name,
            type,
            Component,
            InputsChildren,
            disabled,
            inputsChildrenJSX,
            isFullWidth,
            props,
            sx,
            thumbName,
          },
          key
        ) => {
          return (
            <Fragment key={key}>
              <InputBoxItems
                sx={sx}
                type={type}
                props={props}
                name={name}
                isFullWidth={isFullWidth}
                thumbName={thumbName}
                Component={Component}
                disabled={disabled}
                formIK={formIK}
                columnGridSize={columnGridSize}
                InputsChildren={InputsChildren}
                inputsChildrenJSX={inputsChildrenJSX}
              />
            </Fragment>
          );
        }
      )}
    </>
  );
});

export const InputBoxItems = memo<{
  type: TFullInputsAddEdit["type"];
  sx: TFullInputsAddEdit["sx"];
  props: TFullInputsAddEdit["props"];
  name: TFullInputsAddEdit["name"];
  isFullWidth: TFullInputsAddEdit["isFullWidth"];
  thumbName: TFullInputsAddEdit["thumbName"];
  Component: TFullInputsAddEdit["Component"];
  disabled: TFullInputsAddEdit["disabled"];
  InputsChildren: TFullInputsAddEdit["InputsChildren"];
  inputsChildrenJSX: TFullInputsAddEdit["inputsChildrenJSX"];
  columnGridSize: TColumnGridSize;
  formIK: TAny;
}>(
  ({
    Component,
    InputsChildren,
    columnGridSize,
    disabled,
    formIK,
    inputsChildrenJSX,
    isFullWidth,
    name,
    props,
    sx,
    thumbName,
    type,
  }) => {
    const { lng } = useContext(MainContext);

    let result;

    const value = useMemo(
      () => (formIK ? formIK.values[name] : props?.[type]?.value),
      [formIK, name, props, type]
    );

    const InputChildeHandler = useCallback(() => {
      return (
        <>
          {InputsChildren &&
            (!inputsChildrenJSX ? (
              <InputsBox
                columnGridSize={columnGridSize}
                inputs={
                  InputsChildren({
                    value,
                    formIK,
                    columnGridSize,
                  }) as TFullInputsAddEdit[]
                }
                formIK={formIK}
              />
            ) : (
              (InputsChildren({
                value: formIK && formIK.values[name],
                formIK,
                columnGridSize,
              }) as JSX.Element)
            ))}
        </>
      );
    }, [
      InputsChildren,
      columnGridSize,
      formIK,
      inputsChildrenJSX,
      name,
      value,
    ]);

    const DateTimePickerComponent = DateTimePickerComponentObject[lng];
    const DatePickerComponent = DatePickerComponentObject[lng];

    switch (type) {
      case "autocomplete":
        result = (
          <CustomAutocomplete
            disablePortal
            isOptionEqualToValue={({ label }, value) =>
              label.toString() == value.toString()
            }
            value={(formIK && formIK.values[name]) || ""}
            onChange={(_, value) =>
              formIK && formIK.setFieldValue(name, (value as IOption)?.value)
            }
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["autocomplete"]?.errorMessage
            }
            forcePopupIcon={true}
            {...(props?.["autocomplete"] ?? { options: [] })}
          />
        );
        break;

      case "select":
        result = (
          <CustomSelect
            name={name}
            value={(formIK && formIK.values[name]) ?? ""}
            onChange={formIK && formIK.handleChange}
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["select"]?.errorMessage
            }
            {...(props?.["select"] ?? { items: [] })}
          />
        );
        break;
      case "input":
        result = (
          <>
            <CustomTextfield
              autoComplete="off"
              // inputProps={{
              //   maxLength: props?.["input"]?.currency?.has
              //     ? MAX_LENGTH_CURRENCY_INPUT
              //     : MAX_LENGTH_INPUT,
              // }}
              name={name}
              value={formIK && formIK.values[name]}
              onChange={formIK && formIK.handleChange}
              disabled={disabled}
              errorMessage={
                formIK && formIK.errors[name]
                  ? {
                      text: formIK && formIK.errors[name],
                      type: "error",
                    }
                  : props?.["input"]?.errorMessage
              }
              {...(props?.["input"] ?? {})}
            />
          </>
        );
        break;

      case "checkbox":
        result = (
          <CustomCheckbox
            name={name}
            checked={formIK && formIK.values[name]}
            onChange={(_, checked) =>
              formIK && formIK.setFieldValue(name, checked)
            }
            disabled={disabled}
            {...(props?.["checkbox"] ?? {})}
          />
        );
        break;

      case "datePicker":
        result = (
          <DatePickerComponent
            slotProps={{
              field: { clearable: true },
            }}
            value={
              formIK && formIK.values[name]
                ? (new Date(formIK && formIK.values[name]) as Date)
                : null
            }
            onChange={(value) =>
              formIK &&
              formIK.setFieldValue(name, value && DateFormatIsoMOMENT(value))
            }
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["datePicker"]?.errorMessage
            }
            {...(props?.["datePicker"] ?? {})}
          />
        );

        break;

      case "dateTimePicker":
        result = (
          <DateTimePickerComponent
            slotProps={{
              field: { clearable: true },
            }}
            value={
              formIK && formIK.values[name]
                ? (new Date(formIK && formIK.values[name]) as Date)
                : null
            }
            onChange={
              ((value: string) =>
                formIK &&
                formIK.setFieldValue(
                  name,
                  DateTimeFormatIsoMOMENT(value)
                )) as TAny
            }
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["dateTimePicker"]?.errorMessage
            }
            {...(props?.["dateTimePicker"] ?? {})}
          />
        );

        break;

      case "radioGroup":
        result = (
          <CustomRadioGroup
            name={name}
            value={formIK && formIK.values[name]}
            onChange={formIK && formIK.handleChange}
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["radioGroup"]?.errorMessage
            }
            {...(props?.["radioGroup"] ?? {})}
          />
        );
        break;

      case "timePicker":
        result = (
          <CustomTimePicker
            slotProps={{
              field: { clearable: true },
            }}
            name={name}
            value={
              formIK && formIK.values[name]
                ? (new Date(formIK && formIK.values[name]) as Date)
                : null
            }
            onChange={(value: Date | null) =>
              formIK &&
              formIK.setFieldValue(
                name,
                DateTimeFormatIsoMOMENT(value as unknown as string)
              )
            }
            disabled={disabled}
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["timePicker"]?.errorMessage
            }
            {...(props?.["timePicker"] ?? {})}
          />
        );
        break;

      case "fileUploader":
        result = (
          <FileUploader
            defaultFiles={
              formIK && formIK.values[name]
                ? formIK && commaStringToArray(formIK.values[name])
                : undefined
            }
            filesState={(value) =>
              name &&
              ((formIK && formIK.values[name]) || "") !==
                arrayToCommaString(value) &&
              formIK &&
              formIK.setFieldValue(name, arrayToCommaString(value))
            }
            thumbnailsState={(value) =>
              thumbName &&
              ((formIK && formIK.values[thumbName]) || "") !=
                arrayToCommaString(value) &&
              formIK &&
              formIK.setFieldValue(thumbName, arrayToCommaString(value))
            }
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK && formIK.errors[name],
                    type: "error",
                  }
                : props?.["fileUploader"]?.errorMessage
            }
            {...(props?.fileUploader ?? {})}
          />
        );
        break;

      case "profileUploader":
        result = (
          <ProfileUploader
            defaultValue={(formIK && formIK.values[name]) ?? undefined}
            filesState={(value) =>
              name &&
              formIK.values[name] !== value &&
              formIK.setFieldValue(name, value)
            }
            thumbnailsState={(value) =>
              thumbName &&
              formIK.values[thumbName] !== value &&
              formIK.setFieldValue(thumbName, value)
            }
            errorMessage={
              formIK && formIK.errors[name]
                ? {
                    text: formIK.errors[name],
                    type: "error",
                  }
                : props?.["profileUploader"]?.errorMessage
            }
            {...(props?.profileUploader ?? {})}
          />
        );
        break;

      case "custom":
        result = Component ? Component(name, formIK) : <></>;
        break;

      case "emptyInput":
        result = <></>;
        break;

      default:
        break;
    }
    return (
      <>
        <Grid
          sx={sx}
          size={{
            md: isFullWidth ? 12 : columnGridSize ?? 5.9,
            lg: isFullWidth ? 12 : columnGridSize ?? 5.9,
            sm: 12,
            xs: 12,
          }}
        >
          {result}
        </Grid>
        {InputChildeHandler()}
      </>
    );
  }
);
