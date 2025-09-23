interface IBreadcrumbsItems {
  name: string;
  link: string;
  type: TBreadcrumbsType;
  localNavigate?: boolean;
}

interface IFileUploader {
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  deletable?: boolean;
  helperText?: string;
  customLabel?: string;
  defaultFile?: string[];
  downloadable?: boolean;
  type?: TFileUploaderType;
  errorMessage?: IErrorMessage;
  filesState?: (value: string[]) => void;
  thumbnailsState?: (value: string[]) => void;
  setting?: { folderName?: string };
}

type TUpladerIcon =
  | "pdf"
  | "mp3"
  | "mp4"
  | "txt"
  | "gif"
  | "jpg"
  | "jpeg"
  | "png"
  | "webp"
  | "unknown";

type TFileUploaderTypes = { [key in TFileUploaderType]: Tany };
type TFileUploaderTypeAccept = { [key in TFileUploaderType]: string[] };

type TUploaderIcons = { [key in TUpladerIcon]: TAny };

interface IProfileUploader extends IStaticControllerProps {
  defaultValue?: string;
  filesState?: (value: string, resetValue: TEmptyVoidFunction) => void;
  thumbnailsState?: (value: string) => void;
  variant?: TImageVariant;
  helperText?: string;
}

interface IQRCodeBox extends IStaticControllerProps {
  value?: string;
}

interface IIconTable {
  title: string;
  className?: string;
  placement?: "bottom" | "top" | "left" | "right";
  icon?: JSX.Element | string;
  onClick?: TEmptyVoidFunction;
  hasText?: boolean;
  hasDivider?: boolean;
  color?: string;
}

type TStatusBoxSize = "small" | "medium" | "large" | "extraLarge";

interface IStatusBox {
  color: string;
  text: string | undefined;
  size?: TStatusBoxSize;
}
