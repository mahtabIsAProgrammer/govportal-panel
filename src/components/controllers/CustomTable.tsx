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
  useMemo,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { map } from "lodash";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_MUTED_TEXT,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import {
  ROWS_PER_PAGES,
  ROWS_PER_PAGE_DEFILE,
} from "../../helpers/constants/statics";
import { CustomSelect } from "./CustomSelect";
import { TextTooltip } from "../common/TextTooltip";
import { EmptyValue } from "../other/EmptyComponents";
import { CustomPagination } from "./CustomPagination";
import { optionCreator } from "../../helpers/utils/others";
import { checkFalsyValue } from "../../helpers/utils/values";
import { NoOptionComponent } from "../common/NoOptionComponent";
import { SPACE_LG, SPACE_XS } from "../../helpers/constants/spaces";
import { en2faDigits, priceFormatter } from "../../helpers/utils/numbers";
import { FONT_BUTTON, FONT_CAPTION } from "../../helpers/constants/fonts";

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
    value: string | number;
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
    setting: { totalCount, hasIndex },
  } = useContext(CustomTableContext);

  const onChangePagination = useCallback(
    (_: ChangeEvent<unknown>, page: number) => {
      setPage && setPage(page);
    },
    [setPage]
  );

  const headCellsLength = useMemo(() => (hasIndex ? 1 : 0), [hasIndex]);

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
            >
              <TableBody className="empty-table-body">
                <TableRow className="empty-table-row">
                  <TableCell
                    colSpan={headCellsLength}
                    className="empty-table-cell"
                  >
                    <NoOptionComponent imageSize="medium" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
      {valueRows?.length > 0 &&
        (totalCount || page !== undefined || perPage != undefined) && (
          <>
            <Grid container className="footer-table-container">
              <Grid
                container
                className="footer-table-counter"
                size={{ md: 2.5 }}
              >
                {totalCount && (
                  <>
                    <Box component="p" className="text">
                      total Number
                    </Box>
                    <Box component="p" className="count">
                      {totalCount ?? "0"}
                    </Box>
                  </>
                )}
              </Grid>

              <Grid
                container
                size={{ md: 5.5 }}
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

              <Grid container className="footer-table-pager" size={{ md: 2.5 }}>
                {perPage != undefined && (
                  <>
                    <Box component="p">{"row"}</Box>
                    <CustomSelect
                      menuItemSX={footerTablePagerMenuItemSX}
                      menuPaperSX={footerTablePagerMenuPaperSX}
                      items={optionCreator({
                        data: ROWS_PER_PAGES,
                        id: "value",
                        name: "value",
                        hasNotEmpty: true,
                      })}
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
    <TableHead sx={tableHeadContainerSX} className="table-head-container">
      <TableRow className="table-head-row">
        <>
          {hasIndex && (
            <TableCell className="table-head-cell-index">
              <Box className="header-box">row</Box>
            </TableCell>
          )}
          {map(headerCells, ({ isCenter, width, label, renderHeader }, key) => (
            <TableCell
              className="table-head-cells"
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
      <TableRow
        hover
        tabIndex={-1}
        className="table-body-row"
        sx={tableBodyContainerSX}
      >
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
    setting: { RenderRowIndex },
  } = useContext(CustomTableContext);

  const RenderRowComponent = useCallback(
    () =>
      RenderRow &&
      (RenderRow({
        row: row,
        index: index,
        rows: valueRows,
        value: row?.[id],
        colIndex: colIndex,
      }) as ReactNode),

    [RenderRow, colIndex, id, index, row, valueRows]
  );

  const RenderRowIndexComponent = useCallback(
    () =>
      RenderRowIndex &&
      (RenderRowIndex({
        row: row,
        index: index,
        rows: valueRows,
        value: row?.[id],
        colIndex: colIndex,
      }) as ReactNode),
    [RenderRowIndex, colIndex, id, index, row, valueRows]
  );

  return (
    <TableCell
      scope="row"
      id={labelId}
      component="th"
      padding="none"
      className="table-body-cells"
      sx={tableBodyCellsSX(width, isCenter)}
    >
      <Box className="body-cells-box">
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
  );
};

const tableBodyContainerSX: SxProps<Theme> = {
  "&.table-body-row": {
    backgroundColor: "white",
    "& .MuiTableCell-root": {
      py: "12px",
      px: "12px",
      borderBottom: `1px solid ${COLOR_BORDER}`,
    },
  },
};

const tableHeadContainerSX: SxProps<Theme> = {
  "& .table-head-row": {
    "& .table-head-cell-index": {
      width: ROW_WIDTH + "px",
      minWidth: ROW_WIDTH + "px",
      maxWidth: ROW_WIDTH + "px",
      "& .header-box": {
        width: ROW_WIDTH + "px",
        minWidth: ROW_WIDTH + "px",
        maxWidth: ROW_WIDTH + "px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600",
        color: COLOR_MUTED_TEXT,
        gap: SPACE_XS,
        textAlign: "center",
      },
    },
    background: COLOR_WHITE,
    "& .MuiTableCell-root": {
      borderBottom: `1px solid ${COLOR_BORDER}`,
      background: "#F7F7F7",
      py: "12px",
      "&:first-of-type": {
        borderTopLeftRadius: "12px",
      },
      "&:last-child": {
        borderTopRightRadius: "12px",
      },
    },
  },
};

const footerTablePagerMenuPaperSX: SxProps = {
  "& .MuiMenu-paper": {
    my: "0px !important",
    borderRadius: "8px",
    padding: "6px",
  },
  "& .MuiList-root": {
    py: "0px !important",
  },
  "& .MuiMenuItem-root": {
    my: "0 !important",
    py: "4px !important",
  },
};

const footerTablePagerMenuItemSX: SxProps = {
  width: "100%",

  borderRadius: "4px",
  "& .MuiMenu-list": {
    backgroundColor: "red",
  },
  "& .select-item": {
    height: "fit-content",
    fontSize: FONT_CAPTION,
    fontWeight: "600",
  },
};

const customTableSX: SxProps<Theme> = {
  "&.custom-table": {
    width: "100%",
    "& .table-container-wrapper": {
      display: "flex ",
      justifyContent: "center",
      width: "100%",
      "& .table-container": {
        height: "unset",
        minHeight: "300px",
        animation: "fadeIn 0.3s",
        "& .empty-table-body": {
          "& .empty-table-row": {
            "& .empty-table-cell": {
              textAlign: "center",
              animation: "fadeIn 0.5s",
              "& .empty-table-cell-container": {
                width: "100%",
                display: "flex",
                justifyContent: "center",
              },
            },
          },
        },
        "& .table": {
          borderSpacing: "0px",
          borderTopRightRadius: "12px",
          borderTopLeftRadius: "12px",
          borderLeft: `1px solid ${COLOR_BORDER}`,
          borderTop: `1px solid ${COLOR_BORDER}`,
          borderRight: `1px solid ${COLOR_BORDER}`,
        },
      },
    },
    "& .footer-table-container": {
      alignContent: "center",
      px: SPACE_LG,
      py: "8px",
      // mx: "6px",
      gap: "6px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      borderSpacing: "0px",
      backgroundColor: "#F7F7F7",
      borderTop: `1px solid transparent`,
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
      borderLeft: `1px solid ${COLOR_BORDER}`,
      borderRight: `1px solid ${COLOR_BORDER}`,
      borderBottom: `1px solid ${COLOR_BORDER}`,
      justifyContent: "space-between",
      color: "#A3A3A3",
      fontSize: FONT_CAPTION,
      fontWeight: "600",

      "& .footer-table-pagination": {
        display: "flex",
        justifyContent: "center",
      },
      "& .footer-table-pager": {
        gap: "12px",
        display: "flex",
        color: COLOR_PRIMARY_TEXT,
        alignItems: "center",
        justifyContent: "end",
        fontSize: FONT_CAPTION,
        fontWeight: "600",
        lineHeight: "22px ",

        "& .wrapper-custom-select": {
          width: "80px",
          p: "0px",
          "& .custom-select": {
            height: "36px",
          },
          "& *": {
            border: "none",
            borderRadius: "6px",
          },
        },
      },
      "& .footer-table-counter": {
        gap: "12px",
        display: "flex",
        alignItems: "flex-start",
        "& .count": {
          lineHeight: "18px",
          color: COLOR_PRIMARY,
          fontSize: FONT_BUTTON,
          fontWeight: "600",
        },
        "& .text": { color: "#B2B2B2", fontSize: "12px" },
      },

      "& .wrapper-custom-select": {
        width: "70px",
        p: "0px",
        "& .custom-select": {
          minHeight: "40px",
          background: COLOR_WHITE,
        },
        "& *": {
          FontSize: FONT_CAPTION,
          borderRadius: "4px",
        },
      },
      "& .count, .text": {
        color: COLOR_PRIMARY_TEXT,
        fontSize: FONT_CAPTION,
        fontWeight: "600",
      },
      "& .text": {
        color: "",
      },
    },
  },
};

const tableHeadCellsSX = (
  width?: number,
  isCenter?: boolean
): SxProps<Theme> => ({
  "&.table-head-cells": {
    display: "table-cell",
    width: width ? width + "px" : "unset",
    minWidth: width ? width + "px" : "unset",
    maxWidth: width ? width + "px" : "unset",
    "& .header-box": {
      width: width ? width + "px" : "unset",
      minWidth: width ? width + "px" : "unset",
      maxWidth: width ? width + "px" : "unset",
      display: "flex !important",
      flexDirection: "row",
      justifyContent: isCenter ? "center" : "flex-start",
      alignItems: "center",
      fontWeight: "600",
      color: COLOR_MUTED_TEXT,
      gap: SPACE_XS,
      textAlign: "center",
      fontSize: FONT_BUTTON,
    },
  },
});

const tableBodyCellsSX = (
  width?: number,
  isCenter?: boolean
): SxProps<Theme> => ({
  "&.table-body-cells": {
    display: "table-cell",
    width: width ? width + "px" : "unset",
    minWidth: width ? width + "px" : "unset",
    maxWidth: width ? width + "px" : "unset",
    "& .body-cells-box": {
      textAlign: "left",
      width: width ? width + "px" : "unset",
      minWidth: width ? width + "px" : "unset",
      maxWidth: width ? width + "px" : "unset",
      height: "100%",
      display: "flex !important",
      justifyContent: isCenter ? "center" : "flex-start",
      alignItems: isCenter ? "center" : "flex-start",
      color: COLOR_PRIMARY_TEXT,
      fontSize: FONT_CAPTION,
      fontWeight: "600",
      "& span": {
        color: COLOR_PRIMARY_TEXT,
        fontSize: FONT_CAPTION,
        fontWeight: "600",
      },
    },
  },
});
