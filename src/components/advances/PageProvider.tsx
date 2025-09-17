import { map } from "lodash";
import { type FC } from "react";
import { Box } from "@mui/material";

import { HeaderPage } from "../common/Header";
import { addICON } from "../other/FunctionalSVG";
import { COLOR_WHITE } from "../../helpers/constants/colors";
import { pageProviderSX } from "../../helpers/styles/advances";
import { CustomTab, type ITabData } from "../controllers/CustomTab";
import { TableProvider, type TTableProvider } from "./TableProvider";

export type TPageProvider = TTableProvider;
export const PageProvider: FC<
  IPageProvider<ITabData<TPageProvider>, TPageProvider>
> = ({
  tabData,
  tableData,
  buttonLink,
  breadcrumbs,
  withoutInsert,
  localNavigate,
  handleInsertButton,
  otherComponentHeader,
  texts: { buttonInsert, title },
}) => {
  const { useListRows, tableOptions } = tableData || {};

  return (
    <Box sx={pageProviderSX}>
      <HeaderPage
        title={title}
        localNavigate={localNavigate}
        breadcrumbData={breadcrumbs}
        button={{
          props: (!withoutInsert
            ? {
                text: buttonInsert,
                size: "large",
                startIcon: addICON(COLOR_WHITE),
                color: "primary",
                variant: "contained",
                onClick: handleInsertButton ?? undefined,
              }
            : "") as TAny,
          link: buttonLink ?? undefined,
        }}
        otherComponent={otherComponentHeader}
      />
      {tableData && useListRows && (
        <TableProvider useListRows={useListRows} tableOptions={tableOptions} />
      )}
      {tabData && (
        <CustomTab
          data={map(tabData, (item, key): ITabData => {
            const {
              component: { useListRows, tableOptions },
              label,
              color,
              tabNumber,
            } = item;
            return {
              label,
              color,
              tabNumber,
              component: (
                <TableProvider
                  key={key}
                  useListRows={useListRows}
                  tableOptions={tableOptions}
                />
              ),
            };
          })}
        />
      )}
    </Box>
  );
};
