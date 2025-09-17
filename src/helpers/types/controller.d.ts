interface IErrorMessage {
  text: string;
  type: "error" | "warning" | "helperText";
  disabled?: boolean;
}

interface ICustomLabel {
  customLabel?: string;
  //   subTitleLabel?: string;
  required?: boolean;
  disabled?: boolean;
  tooltip?: {
    text: string;
    placement?: "bottom" | "top" | "right" | "left";
  };
  gap?: number | string;
}

interface ICustomBreadcrumbsItems {
  name: TKeyTranslate;
  link: string;
  clickHandler?: (link: string) => void;
}

interface IOption {
  label: string;
  image?: TAnyObjects;
  isInserting?: boolean;

  isEmpty?: boolean;
  value: number | string;
  subLabel?: string;
}

interface IActionAlert {
  snackbarId: TAny;
  onClickOk: TEmptyVoidFunction;
  onClickCancel?: TEmptyVoidFunction;
}

interface IDataCheckbox {
  id: number;
  label?: string;
  checked?: boolean;
}

interface IStaticControllerProps {
  disabled?: boolean;
  required?: boolean;
  customLabel?: string;
  tooltip?: {
    text: string;
    placement?: "bottom" | "top" | "right" | "left";
  };
  errorMessage?: IErrorMessage;
}

interface IDataRadio {
  label: string;
  control?: JSX.Element;
  value: string | number | boolean;
  labelPlacement?: "bottom" | "top" | "end" | "start" | undefined;
}

type TImageVariant = "circular" | "rounded";

type TDialogSize = "fullScreen" | "large" | "medium" | "small";
