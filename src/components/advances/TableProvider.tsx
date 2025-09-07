import { debounce, isEmpty, isNumber } from "lodash";
import { Grid, type SxProps, type Theme } from "@mui/material";
import { memo, useCallback, useMemo, useState, type FC } from "react";

import {
  CustomTable,
  type IHeaderCell,
  type ICustomTable,
} from "../controllers/CustomTable";
import {
  DEBOUNCE_SEARCH_TIME,
  ROWS_PER_PAGE_DEFILE,
} from "../../helpers/constants/statics";
import { LoadingTable } from "../common/Loading";
import { searchStatusICON } from "../other/FunctionalSVG";
import type { TInputTypesObject } from "./AddEditProvider";
import { CustomSelect } from "../controllers/CustomSelect";
import { CustomTextfield } from "../controllers/CustomTextfield";
import { CustomAutoComplete } from "../controllers/CustomAutoComplete";
import { responsePropsByLengthOnStandard } from "../../helpers/utils/handlers";

export type TTableProvider<T = TAny> = ITableProvider<
  IHeaderCell<T>,
  TInputTypesObject,
  ICustomTable
>;

export type TTableProviderTableSetting<T = TAny> = ITableProviderTableSetting<
  IHeaderCell<T>,
  TInputTypesObject,
  ICustomTable
>;

export const TableProvider = memo<TTableProvider>(
  ({ useListRows, tableOptions }) => {
    const {
      groupBy,
      hasIndex,
      isLoading,
      headerCells,
      withOutSearch,
      RenderRowIndex,
      defaultExtraFilter,
      extraFilterItemList,
    } = tableOptions ?? {};

    const [page, setPage] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>("");
    const [extraFilter, setExtraFilter] = useState<TAny>(undefined);
    const [perPage, setPerPage] = useState<number>(ROWS_PER_PAGE_DEFILE);

    const backToFirstPage = useCallback(() => {
      setPage(1);
    }, []);

    const extraFilterfinal = useMemo(
      () => ({
        ...(defaultExtraFilter || {}),
        ...(extraFilter || {}),
      }),
      [defaultExtraFilter, extraFilter]
    );

    const result = useListRows(
      page,
      perPage,
      keyword || undefined,
      isEmpty(extraFilterfinal)
    );

    const { data: baseData, isLoading: isLoadingTable } = useMemo(
      () => result ?? {},
      [result]
    );

    const data = useMemo(
      () =>
        ({ ...baseData }?.data?.data?.data
          ? { ...baseData }?.data?.data
          : { ...baseData }?.data?.data
          ? { ...baseData }?.data
          : { ...baseData }),
      [baseData]
    );
    const filterItems: IFilterItem<TInputTypesObject>[] = useMemo(
      () => [
        ...(extraFilterItemList ?? []),
        ...((withOutSearch
          ? []
          : [
              {
                name: "keyword",
                type: "input",
                label: "Search",
                onChange: (value) => {
                  setKeyword(value as string);
                  backToFirstPage();
                },
                props: {
                  input: {
                    icon: searchStatusICON(),
                  },
                },
              },
            ]) as IFilterItem<TInputTypesObject>[]),
      ],
      [extraFilterItemList, withOutSearch, backToFirstPage]
    );

    return (
      <Grid container className="table-wrapper" sx={tableProviderSX()}>
        <Grid className="table-content">
          <Grid className="table-filter-wrapper">
            <Grid className="table-filters">
              <FilterTableInputs
                filterItems={filterItems}
                extraFilterfinal={extraFilterfinal}
                setExtraFilter={setExtraFilter}
                backToFirstPage={backToFirstPage}
              />
            </Grid>
          </Grid>
          {!isLoading && !isLoadingTable ? (
            <CustomTable
              valueRows={data?.data ?? []}
              headerCells={headerCells ?? []}
              page={page}
              setPage={setPage}
              perPage={perPage}
              setPerPage={(perPage: number) => {
                setPerPage(perPage);
                backToFirstPage();
              }}
              totalPageCount={data?.totalPages}
              setting={{
                groupBy,
                hasIndex,
                totalCount: data?.totalCount,
                RenderRowIndex,
              }}
            />
          ) : (
            <LoadingTable />
          )}
        </Grid>
      </Grid>
    );
  }
);

const FilterTableInputs: FC<IFilterTableInputs<TInputTypesObject>> = ({
  backToFirstPage,
  extraFilterfinal,
  filterItems,
  setExtraFilter,
}) => {
  const filterItemLength = filterItems?.length || 0;

  return (
    filterItemLength > 0 &&
    filterItems
      .filter(({ cantBeNull, name }) =>
        cantBeNull ? extraFilterfinal?.[name] : true
      )
      .map(({ name, onChange, type, Component, props }) => {
        let result = <></>;
        result = <></>;
        switch (type) {
          case "autocomplete":
            result = (
              <CustomAutoComplete
                disablePortal
                isOptionEqualToValue={({ label }, value) =>
                  label.toString() == value.toString()
                }
                {...(props?.["autoComplete"] ?? { options: [] })}
                forcePopupIcon={true}
                value={
                  !isNumber(extraFilterfinal?.[name]) &&
                  !extraFilterfinal?.[name]
                    ? ""
                    : extraFilterfinal?.[name]
                }
                onChange={(_, value: TAny) => {
                  onChange(
                    !isNumber(value?.value) && !value?.value
                      ? ""
                      : value?.value,
                    extraFilterfinal,
                    setExtraFilter
                  );
                  backToFirstPage();
                }}
              />
            );
            break;
          case "select":
            result = (
              <CustomSelect
                {...(props?.["select"] ?? { items: [] })}
                value={
                  !isNumber(extraFilterfinal?.[name]) &&
                  !extraFilterfinal?.[name]
                    ? ""
                    : extraFilterfinal?.[name]
                }
                onChange={(e) => {
                  onChange(
                    e.target.value as string,
                    extraFilterfinal,
                    setExtraFilter
                  );
                  backToFirstPage();
                }}
              />
            );
            break;
          case "input":
            result = (
              <CustomTextfield
                autoComplete="off"
                {...(props?.["input"] ?? {})}
                name={name}
                onChange={debounce((e) => {
                  onChange(e.target.value, extraFilterfinal, setExtraFilter);
                  backToFirstPage();
                }, DEBOUNCE_SEARCH_TIME)}
              />
            );
            break;

          case "custom":
            result = Component ? (
              Component({
                name,
                value: extraFilterfinal?.[name] || null,
                extraFilter: extraFilterfinal,
                setExtraFilter,
              })
            ) : (
              <></>
            );
            break;

          default:
            break;
        }
        return (
          <Grid
            key={name}
            className="table-filter-item"
            size={{ ...responsePropsByLengthOnStandard(filterItemLength) }}
          >
            {result}
          </Grid>
        );
      })
  );
};

const tableProviderSX = (): SxProps<Theme> => ({});
