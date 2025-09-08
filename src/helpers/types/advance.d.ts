type TInputPropTypes = {
  TInput: never;
  TSwitch: never;
  TInputPassword: never;
  TTagsInput: never;
  TSelect: never;
  TAutocomplete: never;
  TCheckbox: never;
  TDatePicker: never;
  TDateTimePicker: never;
  TTimePicker: never;
  TTextarea: never;
  TCurrencyInput: never;
  TRadioGroup: never;
  ILocalLocationPicker: never;
};

interface IInputProps<TTypes = TInputPropTypes> {
  custom?: TAny;
  emptyInput?: TAny;
  input?: TTypes["TInput"];
  select?: TTypes["TSelect"];
  autocomplete?: TTypes["TAutocomplete"];
  checkbox?: TTypes["TCheckbox"];
  datePicker?: TTypes["TDatePicker"];
  dateTimePicker?: TTypes["TDateTimePicker"];
  timePicker?: TTypes["TTimePicker"];
  radioGroup?: TTypes["TRadioGroup"];
  fileUploader?: IUploaderFile;
  profileUploader?: IProfileUploader;
  // editorQuill?: IEditorQuill;
  // editorMD?: IEditorMD;
  // editorCk?: IEditorCK;
}

type TInputTypes =
  | "custom"
  | "emptyInput"
  | "input"
  | "select"
  | "autocomplete"
  | "checkbox"
  | "datePicker"
  | "fileUploader"
  | "profileUploader"
  | "dateTimePicker"
  | "timePicker"
  | "radioGroup";

type TColumnGridSize = 3.9 | 5.9 | 8.9 | 12 | undefined;

interface ITableProviderTableSetting<
  T = TAnyObjects,
  TTypes = TInputPropTypes,
  ICustomTable = TAnyObjects
> {
  headerCells: T[];
  isLoading?: boolean;
  withOutSearch?: boolean;
  defaultExtraFilter?: TAnyObjects;
  extraFilterItemList?: IFilterItem<TTypes>[];
  groupBy: ICustomTable["setting"]["groupBy"];
  hasIndex?: ICustomTable["setting"]["hasIndex"];
  RenderRowIndex?: ICustomTable["setting"]["RenderRowIndex"];
}

interface ITableProvider<
  T = TAny,
  TTypes = TInputPropTypes,
  ICustomTable = TAny
> {
  useListRows:
    | ((
        pageNumber?: number,
        pageSize?: number,
        keyword?: string,
        extraFilter?: TAnyObjects
      ) => UseQueryResult<AxiosResponse<never, never>, unknown>)
    | TEmptyVoidFunction;

  tableOptions?: ITableProviderTableSetting<T, TTypes, ICustomTable>;
}

interface IFilterItem<TTypes = TInputPropTypes> {
  name: string;
  label: TKeyTranslate;
  type: TInputTypes;
  cantBeNull?: boolean;
  onChange: (
    value: string | boolean | undefined,
    extraFilter: object,
    setExtraFilter: Dispatch<SetStateAction<object>>
  ) => void;
  Component?: (prop: {
    name: string;
    value: TAnyObjects;
    extraFilter: object;
    setExtraFilter: Dispatch<SetStateAction<object>>;
  }) => JSX.Element;
  props?: IInputProps<TTypes>;
}

interface IFilterTableInputs<TTypes = TInputPropTypes> {
  filterItems: IFilterItem<TTypes>[];
  extraFilterfinal: TAny;
  setExtraFilter: TActionFunction<TAny>;
  backToFirstPage: TEmptyVoidFunction;
}

interface IPageProvider<TTabData, T> {
  breadcrumbs: IBreadcrumbsItems[];
  localNavigate?: boolean;
  withoutInsert?: boolean;
  otherComponentHeader?: JSX.Element;
  buttonLink?: string;
  handleInsertButton?: TEmptyVoidFunction;
  texts: {
    title: string;
    buttonInsert: string;
  };
  tabData?: TTabData[];
  tableData?: T;
}

interface IInputsAddEdit<TTypes = TInputPropTypes, TSX = TAny> {
  sx?: TSX;
  name: string;
  type: TInputTypes;
  thumbName?: string;
  disabled?: boolean;
  isFullWidth?: boolean;
  inputsChildrenJSX?: boolean;
  InputsChildren?: (props: {
    value: string | number;
    formIK: TAnyObjects;
    columnGridSize?: IColumnGridSize;
  }) => IInputsAddEdit<TTypes, TSX>[] | JSX.Element;
  Component?: TInputsAddEditComponent;
  props?: IInputProps<TTypes>;
}

type TInputsAddEditComponent = (name: string, formIK: TAny) => JSX.Element;

interface TFormAddEditProvider<TFormikHelpers = TAnyObjects> {
  loading: boolean;
  validationFunctions?: () => object;
  initialValues: TAnyObjects;
  onSubmit: (
    values: TAnyObjects,
    formikHelpers: TFormikHelpers
  ) => void | Promise<TAnyObjects>;
  onCancel: ((formikHelpers: TFormikHelpers) => void) | null;
}

interface IAddEditProvider<T, TFormikHelper = TAny> {
  breadcrumbs: IBreadcrumbsItems[];
  isLoading: boolean;
  setting: {
    isEdit: boolean;
  };
  texts: {
    title: string;
    submitText?: string;
    cancelText?: string;
  };
  forms: TFormAddEditProvider<TFormikHelper>;
  options: {
    content: IContentAddEdit<T>;
  };
}

interface IContentAddEdit<T> {
  CustomSections?: JSX.Element;
  normalContent?:
    | INormalContentAddEdit<T>
    | ((formIK: TAny) => INormalContentAddEdit<T>);
}

interface INormalContentAddEdit<T> {
  side?: ISidePageAddEdit<T>;
  inputs: T[] | ((formIK: TAny) => T[]);
  columnGridSize?: TColumnGridSize;
}

interface ISidePageAddEditUploaderFile {
  name: string;
  thumbName?: string;
  props: IUploaderFile;
}

interface ISideContentAddEdit<T> {
  QRCodeBox?: {
    name: string;
    props: IQRCodeBox;
  };
  fileUploader?: ISidePageAddEditUploaderFile[];
  profileUploader?: {
    name: string;
    thumbName?: string;
    props: IProfileUploader;
  };
  columnGridSize?: TColumnGridSize;
  inputs?: T[];
}

interface IAddEditProviderContent<T> {
  sideData: ISidePageAddEditUploaderFile<T> | undefined;
  content: JSX.Element;
  formIK: TAny;
  withoutSideNav?: boolean;
}
