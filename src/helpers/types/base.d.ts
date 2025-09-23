type TLanguages = "fa" | "en";
type TTheme = "light" | "dark";
type TDirection = "rtl" | "ltr";
type TSidebarSize = "normal" | "medium" | "none";
type TSystemFont = {
  [key in TLanguages]: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAny = any;

type TEmptyVoidFunction = () => void | TAnyObjects | Promise<TAnyObjects>;

type TOrder = "asc" | "desc";

type TActionFunction<T> = (value: T | ((prev: T) => T)) => void;

interface IResponsePropsMui<T = number> {
  xl?: T;
  lg?: T;
  md: T;
  sm: T;
  xs: T;
}

type TFileUploaderType = "audio" | "video" | "image" | "file";

interface IFileProps {
  file?: File | undefined;
  path?: string | undefined;
  filePath?: string | undefined;
  thumbPath?: string | undefined;
  hasPreview?: boolean;
  preview?: strign;
  id: string;
  isSingle?: boolean;
  isUploading?: boolean;
  isAborted?: boolean;
  uploadObject?: TAny;
}

interface IMutateAsyncResponseGuid {
  data: { data: string };
}
type TStateActionFunction<T> = (value: T | ((prev: T) => T)) => void;
