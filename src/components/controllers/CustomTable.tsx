/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Box,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  type Theme,
  type SxProps,
  TableContainer,
} from "@mui/material";
import {
  memo,
  type FC,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { map } from "lodash";

import {
  ROWS_PER_PAGES,
  ROWS_PER_PAGE_DEFILE,
} from "../../helpers/constants/statics";
import { CustomSelect } from "./CustomSelect";
import { TextTooltip } from "../common/TextTooltip";
import { EmptyValue } from "../other/EmptyComponents";
import { CustomPagination } from "./CustomPagination";
import { checkFalsyValue } from "../../helpers/utils/values";
import { en2faDigits, priceFormatter } from "../../helpers/utils/numbers";

type TRowDefault = TAny & {
  id: number | string;
};
export interface IHeaderCell<T = TAny> {
  id: keyof T;
  abs?: boolean;
  label?: string;
  width?: number;
  price?: boolean;
  numeric?: boolean;
  isCenter?: boolean;
  renderHeader?: ReactNode;
  RenderRow?: FC<{
    value: string;
    row: T;
    rows: T[];
    index: number;
    colIndex: number;
  }>;
}

export interface ICustomTable<T = TAny & { id: number | string }> {
  page?: number;
  valueRows: T[];
  perPage?: number;
  totalPageCount?: number;
  headerCells: IHeaderCell[];
  setPage?: (perPage: number) => void;
  setPerPage?: (perPage: number) => void;
  setting: {
    groupBy?: string[];
    hasIndex?: boolean;
    totalCount?: number;
    RenderRowIndex?: FC<{
      value: string;
      row: T;
      rows: T[];
      index: number;
      colIndex: number;
    }>;
  };
}

interface ICustomTableBodyRow {
  index: number;
  row: TRowDefault;
}

interface ICustomTableBodyRowCell {
  index: number;
  labelId: string;
  colIndex: number;
  row: TRowDefault;
  id: IHeaderCell["id"];
  abs: IHeaderCell["abs"];
  width: IHeaderCell["width"];
  price: IHeaderCell["price"];
  numeric: IHeaderCell["numeric"];
  isCenter: IHeaderCell["isCenter"];
  RenderRow: IHeaderCell["RenderRow"];
}

const ROW_WIDTH = 50;

const CustomTableContext = createContext<ICustomTable>({
  setting: {},
  valueRows: [],
  headerCells: [],
});

export const CustomTable = memo<ICustomTable>((props) => {
  return (
    <CustomTableContext.Provider value={props}>
      <CustomTableContent />
    </CustomTableContext.Provider>
  );
});

export const CustomTableContent = memo(() => {
  const {
    page,
    perPage,
    setPage,
    valueRows,
    setPerPage,
    totalPageCount,
    setting: { totalCount },
  } = useContext(CustomTableContext);

  const onChangePagination = useCallback(
    (_: ChangeEvent<unknown>, page: number) => {
      setPage && setPage(page);
    },
    [setPage]
  );

  return (
    <Box sx={customTableSX} className="custom-table">
      <Box className="table-container-wrapper">
        <TableContainer className="table-container">
          {valueRows.length > 0 ? (
            <Table
              size="small"
              stickyHeader
              className="table"
              aria-label="sticky table"
            >
              <CustomTableHead />
              <CustomTableBody />
            </Table>
          ) : (
            <Table
              size="small"
              stickyHeader
              className="table"
              aria-label="sticky table"
            ></Table>
          )}
        </TableContainer>
      </Box>
      {valueRows.length > 0 &&
        (totalCount || page !== undefined || perPage != undefined) && (
          <>
            <Grid container className="footer-table-container">
              <Grid container className="footer-table-counter" size={{ md: 3 }}>
                {totalCount && (
                  <>
                    <Box component="p" className="count">
                      {totalCount ?? "0"}
                    </Box>
                    <Box component="p" className="text">
                      total Number
                    </Box>
                  </>
                )}
              </Grid>

              <Grid
                container
                size={{ md: 6 }}
                className="footer-table-pagination"
              >
                {page != undefined && (
                  <CustomPagination
                    page={page}
                    size="large"
                    color="primary"
                    siblingCount={1}
                    count={totalPageCount}
                    onChange={onChangePagination}
                  />
                )}
              </Grid>

              <Grid container className="footer-table-pager" size={{ md: 3 }}>
                {perPage != undefined && (
                  <>
                    <Box component="p">{"row"}</Box>
                    <CustomSelect
                      items={ROWS_PER_PAGES?.map(() => ({
                        value: "value",
                        label: "value",
                      }))}
                      value={(perPage || ROWS_PER_PAGE_DEFILE)?.toString()}
                      onChange={(e) => {
                        setPerPage &&
                          setPerPage(
                            +(e.target.value as string) || ROWS_PER_PAGE_DEFILE
                          );
                      }}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </>
        )}
    </Box>
  );
});

const CustomTableHead: FC = () => {
  const {
    headerCells,
    setting: { hasIndex },
  } = useContext(CustomTableContext);

  return (
    <TableHead className="table-head-container">
      <TableRow className="table-head-row">
        <>
          {hasIndex && (
            <TableCell className="table-head-cell-index">
              <Box className="head-box">row</Box>
            </TableCell>
          )}
          {map(headerCells, ({ isCenter, width, label, renderHeader }, key) => (
            <TableCell
              className="table-head-celss"
              key={key}
              sx={tableHeadCellsSX(width, isCenter)}
            >
              <Box className="header-box">{renderHeader ?? label}</Box>
            </TableCell>
          ))}
        </>
      </TableRow>
    </TableHead>
  );
};

const CustomTableBody: FC = () => {
  const { valueRows } = useContext(CustomTableContext);
  return (
    <TableBody>
      {map(valueRows, (row, index) => (
        <CustomTableBodyRow key={index} row={row} index={index} />
      ))}
    </TableBody>
  );
};

const CustomTableBodyRow: FC<ICustomTableBodyRow> = ({ index, row }) => {
  const {
    headerCells,
    setting: { hasIndex },
  } = useContext(CustomTableContext);

  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <>
      <TableRow hover tabIndex={-1} className="table-body-row">
        {map(
          hasIndex
            ? [
                ...[
                  {
                    id: "index_row_local_table",
                    isCenter: true,
                    width: ROW_WIDTH,
                  },
                ],
                ...headerCells,
              ]
            : headerCells,
          (
            { id, numeric, price, abs, isCenter, RenderRow, width },
            colIndex
          ) => (
            <CustomTableBodyRowCell
              index={index}
              labelId={labelId}
              colIndex={colIndex}
              row={row}
              id={id}
              width={width}
              isCenter={isCenter}
              RenderRow={RenderRow}
              abs={abs}
              numeric={numeric}
              price={price}
            />
          )
        )}
      </TableRow>
    </>
  );
};

const CustomTableBodyRowCell: FC<ICustomTableBodyRowCell> = ({
  id,
  row,
  abs,
  price,
  index,
  width,
  labelId,
  numeric,
  colIndex,
  isCenter,
  RenderRow,
}) => {
  const {
    page,
    perPage,
    valueRows,
    setting: { RenderRowIndex, groupBy },
  } = useContext(CustomTableContext);

  const RenderRowComponent = useCallback(
    () =>
      RenderRow &&
      RenderRow({
        row: row,
        index: index,
        rows: valueRows,
        value: row?.[id],
        colIndex: colIndex,
      }),

    [RenderRow, colIndex, id, index, row, valueRows]
  );

  const RenderRowIndexComponent = useCallback(
    () =>
      RenderRowIndex &&
      RenderRowIndex({
        row: row,
        index: index,
        rows: valueRows,
        value: row?.[id],
        colIndex: colIndex,
      }),
    [RenderRowIndex, colIndex, id, index, row, valueRows]
  );

  const rowSpanCount = (id: string | number | symbol) =>
    valueRows.filter((item) => item[id] == row?.[id]).length;

  return (!groupBy || []).includes(id as string) ? (
    <TableCell
      scope="row"
      id={labelId}
      component="th"
      padding="none"
      className="table-body-cells"
      sx={tableBodyCellsSX(width, isCenter)}
      rowSpan={
        (groupBy || []).includes(id as string) ? rowSpanCount(id) : undefined
      }
    >
      <Box className="body-cell-box">
        {!checkFalsyValue(row?.[id]) &&
        id != "index_row_local_table" &&
        !RenderRow ? (
          <EmptyValue />
        ) : RenderRow ? (
          RenderRowComponent()
        ) : RenderRowIndex ? (
          RenderRowIndexComponent()
        ) : id == "index_row_local_table" ? (
          ((page ?? 1) - 1) * (perPage ?? 0) + (index + 1)
        ) : numeric ? (
          en2faDigits(row?.[id]?.toString() || "")
        ) : price ? (
          priceFormatter(row?.[id]?.toString() || "", abs)
        ) : (
          <TextTooltip text={row?.[id]} />
        )}
      </Box>
    </TableCell>
  ) : undefined;
};

const customTableSX: SxProps<Theme> = {};

const tableHeadCellsSX = (
  width?: number,
  isCenter?: boolean
): SxProps<Theme> => ({});

const tableBodyCellsSX = (
  width?: number,
  isCenter?: boolean
): SxProps<Theme> => ({});
