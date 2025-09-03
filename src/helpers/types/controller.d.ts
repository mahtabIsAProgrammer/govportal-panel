interface IErrorMessage {
  text: string;
  type: "error" | "warning";
  disabled?: boolean;
}

interface ICustomLabel {
  customLabel?: string;
  //   subTitleLabel?: string;
  required?: boolean;
  disabled?: boolean;
  gap?: number | string;
}
