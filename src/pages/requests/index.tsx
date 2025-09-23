import { find, map } from "lodash";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, type FC } from "react";

import {
  COLOR_RED,
  COLOR_GREEN,
  COLOR_WARNING,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import type {
  UserDataApi,
  RequestDataApi,
  ServiceDataApi,
} from "../../services/configs/apiEndPoint";
import { useGetUserById } from "../../services/hooks/users";
import { StatusBox } from "../../components/common/StatusBox";
import { IconsTable } from "../../components/common/IconTable";
import { eyeIcon } from "../../components/other/FunctionalSVG";
import { useRequestData } from "../../services/hooks/requests";
import { useGetServiceById } from "../../services/hooks/services";
import { PageProvider } from "../../components/advances/PageProvider";
import { REQUEST_STATUS_TYPES_DATA } from "../../helpers/utils/types";
import type { IHeaderCell } from "../../components/controllers/CustomTable";

const List: FC = () => {
  const { data: requestData } = useRequestData();
  const requestSearchData = useMemo(
    () => (requestData as { data: RequestDataApi[] })?.data ?? [],
    [requestData]
  );

  const headerCells = useCallback(
    (): IHeaderCell<RequestDataApi>[] => [
      {
        id: "citizen_id",
        label: "Citizen",
        isCenter: true,
        RenderRow: ({ value }) => {
          const { data: departmentById } = useGetUserById(String(value));
          const { first_name, last_name } =
            (departmentById as { data: UserDataApi } | undefined)?.data ?? {};
          return <>{`${first_name} ${last_name}`}</>;
        },
      },
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
      { id: "reviewed_by", label: "Reviewed By", isCenter: true },
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
    <PageProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Requests", link: "", type: "list" },
      ]}
      texts={{
        title: "Requests",
        buttonInsert: "Add Request",
      }}
      withoutInsert
      tabData={[
        {
          color: COLOR_MUTED_TEXT,
          label: "all",
          tabNumber: requestSearchData?.length ?? 0,
          component: {
            tableOptions: {
              hasIndex: true,
              headerCells: headerCells(),
              defaultExtraFilter: { status: undefined },
            },
            useListRows: useRequestData,
          },
        },
        ...map(REQUEST_STATUS_TYPES_DATA, ({ id, name }) => ({
          color: color[id + 1],
          label: name,
          tabNumber: requestSearchData
            ? requestSearchData?.filter(({ status }) => status == id)?.length ||
              0
            : 0,
          component: {
            tableOptions: {
              headerCells: headerCells(),
              defaultExtraFilter: { status: id },
              hasIndex: true,
            },
            useListRows: useRequestData,
          },
        })),
      ]}
    />
  );
};

export default List;

const color = [COLOR_MUTED_TEXT, COLOR_WARNING, COLOR_GREEN, COLOR_RED];
