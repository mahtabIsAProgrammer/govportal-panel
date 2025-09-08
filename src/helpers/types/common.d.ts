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
  type?: TUploaderFileType;
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
