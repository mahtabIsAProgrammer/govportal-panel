import { Grid } from "@mui/material";
import { filter } from "lodash";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState, type FC } from "react";

import {
  COLOR_GREEN,
  COLOR_RED,
  COLOR_SECONDRY,
} from "../../helpers/constants/colors";
import { IconsTable } from "../../components/common/IconTable";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { NotificationSetting } from "../_root/NotificationSetting";
import { PageProvider } from "../../components/advances/PageProvider";
import { useNotificationData } from "../../services/hooks/notifications";
import { editICON, trashICON } from "../../components/other/FunctionalSVG";
import type { IHeaderCell } from "../../components/controllers/CustomTable";
import type { NotificationDataApi } from "../../services/configs/apiEndPoint";
import { CustomDialogMessage } from "../../components/common/CustomDialogMessages";

const List: FC = () => {
  const [insertToggleModal, setInsertToggleModal] = useState<boolean>(false);

  const { data: notificationData } = useNotificationData();
  const notificationSearchData = useMemo(
    () => (notificationData as { data: NotificationDataApi[] })?.data ?? [],
    [notificationData]
  );

  const headCells = useCallback(
    (): IHeaderCell<NotificationDataApi>[] => [
      {
        id: "user_id",
        label: "user",
        isCenter: true,
      },
      { id: "message", label: "message", isCenter: true },
      {
        id: "id",
        label: "actions",
        RenderRow: ({ value }) => {
          const [open, setOpen] = useState(false);
          // const { mutateAsync: companyDelete, isLoading } = useCompanyDelete();
          const navigate = useNavigate();

          return (
            <>
              <>
                <Grid sx={{ display: "flex" }}>
                  <IconsTable
                    title="edit"
                    icon={editICON()}
                    onClick={() => navigate(`edit/${value}`)}
                  />
                  <IconsTable
                    title="delete"
                    icon={trashICON()}
                    onClick={() => setOpen(true)}
                  />
                </Grid>
              </>
              <CustomDialogMessage
                type="delete"
                open={open}
                onClose={() => setOpen(false)}
                loading={false}
                onSubmit={async () =>
                  tryCatchHandler({
                    handler: async () => {
                      // const data = await companyDelete(+value);

                      return setOpen(false);
                      // return data;
                    },

                    successMessage: "successfully_deleted",
                  })
                }
              />
            </>
          );
        },
        isCenter: true,
      },
    ],
    []
  );

  return (
    <>
      <PageProvider
        breadcrumbs={[
          { name: "dashboard", link: "/", type: "none" },
          { name: "Notifications", link: "", type: "list" },
        ]}
        texts={{
          title: "Dashboard",
          buttonInsert: "Add Notification",
        }}
        handleInsertButton={() => setInsertToggleModal(!insertToggleModal)}
        tabData={[
          {
            color: COLOR_SECONDRY,
            label: "all",
            tabNumber: notificationSearchData?.length ?? 0,
            component: {
              tableOptions: {
                hasIndex: true,
                headerCells: headCells(),
              },
              useListRows: useNotificationData,
            },
          },
          {
            color: COLOR_GREEN,
            label: "Read",
            tabNumber:
              filter(notificationSearchData, ({ is_read }) => is_read)
                ?.length ?? 0,
            component: {
              tableOptions: {
                hasIndex: true,
                headerCells: headCells(),
                defaultExtraFilter: {
                  isRead: true,
                },
              },
              useListRows: useNotificationData,
            },
          },
          {
            color: COLOR_RED,
            label: "Not Read",
            tabNumber:
              filter(notificationSearchData, ({ is_read }) => !is_read)
                ?.length ?? 0,
            component: {
              tableOptions: {
                hasIndex: true,
                headerCells: headCells(),
                defaultExtraFilter: {
                  isRead: false,
                },
              },
              useListRows: useNotificationData,
            },
          },
        ]}
      />
      <NotificationSetting
        insertToggleModal={insertToggleModal}
        setInsertToggleModal={setInsertToggleModal}
      />
    </>
  );
};

export default List;
