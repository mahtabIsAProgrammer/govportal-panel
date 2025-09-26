import { Grid } from "@mui/material";
import { find, map } from "lodash";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  COLOR_RED,
  COLOR_GREEN,
  COLOR_WARNING,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import type {
  RequestDataApi,
  ServiceDataApi,
} from "../../services/configs/apiEndPoint";
import { PAGE_SIZE } from "../../helpers/constants/statics";
import { StatusBox } from "../../components/common/StatusBox";
import { IconsTable } from "../../components/common/IconTable";
import { eyeIcon } from "../../components/other/FunctionalSVG";
import { useGetServiceById } from "../../services/hooks/services";
import { useGetMyRequestData } from "../../services/hooks/requests";
import { REQUEST_STATUS_TYPES_DATA } from "../../helpers/utils/types";
import { PageProvider } from "../../components/advances/PageProvider";
import type { IHeaderCell } from "../../components/controllers/CustomTable";

const MyRequests = () => {
  const { data: requestData } = useGetMyRequestData(1, PAGE_SIZE);
  const requestSearchData = useMemo(
    () => (requestData as { data: RequestDataApi[] })?.data ?? [],
    [requestData]
  );

  const headerCells = useCallback(
    (): IHeaderCell<RequestDataApi>[] => [
      {
        id: "service_id",
        label: "Service",
        isCenter: true,
        RenderRow: ({ value }) => {
          const { data: departmentById } = useGetServiceById(+value);
          const { name } =
            (departmentById as { data: ServiceDataApi } | undefined)?.data ??
            {};
          return <>{name}</>;
        },
      },
      {
        id: "status",
        label: "Status",
        isCenter: true,
        RenderRow: ({ value }) => {
          const status = find(
            REQUEST_STATUS_TYPES_DATA,
            ({ id }) => id == +value
          )?.name;
          return (
            <StatusBox color={color[+value + 1]} text={status} size="large" />
          );
        },
      },
      {
        id: "id",
        label: "actions",
        RenderRow: ({ value }) => {
          const navigate = useNavigate();
          return (
            <Grid sx={{ display: "flex" }}>
              <IconsTable
                title="view details"
                icon={eyeIcon()}
                onClick={() => navigate(`view/${value}`)}
              />
            </Grid>
          );
        },
        isCenter: true,
      },
    ],
    []
  );
  return (
    <Grid
      sx={{
        pt: "120px",
        width: "100%",
        minHeight: "100vh",
        maxWidth: "1200px",
      }}
    >
      <PageProvider
        breadcrumbs={[
          { name: "citizen", link: "/citizen", type: "none" },
          { name: "My Requests", link: "", type: "list" },
        ]}
        texts={{
          title: "My Requests",
          buttonInsert: "E",
        }}
        withoutInsert
        tabData={[
          {
            color: COLOR_MUTED_TEXT,
            label: "all",
            tabNumber: requestData?.totalCount ?? 0,
            component: {
              tableOptions: {
                hasIndex: true,
                headerCells: headerCells(),
                defaultExtraFilter: { status: undefined },
              },
              useListRows: useGetMyRequestData,
            },
          },
          ...map(REQUEST_STATUS_TYPES_DATA, ({ id, name }) => ({
            color: color[id + 1],
            label: name,
            tabNumber: requestSearchData
              ? requestSearchData?.filter(({ status }) => status == id)
                  ?.length || 0
              : 0,
            component: {
              tableOptions: {
                headerCells: headerCells(),
                defaultExtraFilter: { status: id },
                hasIndex: true,
              },
              useListRows: useGetMyRequestData,
            },
          })),
        ]}
      />
    </Grid>
  );
};

export default MyRequests;

const color = [COLOR_MUTED_TEXT, COLOR_WARNING, COLOR_GREEN, COLOR_RED];
