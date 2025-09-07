type TInputPropTypes = {
  TInput: never;
  TSwitch: never;
  TInputPassword: never;
  TTagsInput: never;
  TSelect: never;
  TAutoComplete: never;
  TCheckbox: never;
  TDatePicker: never;
  TDateTimePicker: never;
  TTimePicker: never;
  TTextarea: never;
  TCurrencyInput: never;
  TRadioGroup: never;
  ILocalLocationPicker: never;
  TAutoCompleteChip: never;
};

type TInputTypes =
  | "custom"
  | "emptyInput"
  | "input"
  | "select"
  | "autocomplete";

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
