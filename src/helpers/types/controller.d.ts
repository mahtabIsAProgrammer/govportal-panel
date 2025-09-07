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
