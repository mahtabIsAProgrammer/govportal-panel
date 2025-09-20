import { filter } from "lodash";
import { useCallback, useMemo, useState, type FC } from "react";

import {
  COLOR_RED,
  COLOR_GREEN,
  COLOR_MUTED_TEXT,
} from "../../helpers/constants/colors";
import type {
  UserDataApi,
  NotificationDataApi,
} from "../../services/configs/apiEndPoint";
import { useGetUserById } from "../../services/hooks/users";
import { NotificationSetting } from "../_root/NotificationSetting";
import { PageProvider } from "../../components/advances/PageProvider";
import { useNotificationData } from "../../services/hooks/notifications";
import type { IHeaderCell } from "../../components/controllers/CustomTable";

const List: FC = () => {
  const [insertToggleModal, setInsertToggleModal] = useState<boolean>(false);

  const { data: notificationData } = useNotificationData();
  const notificationSearchData = useMemo(
    () => (notificationData as { data: NotificationDataApi[] })?.data ?? [],
    [notificationData]
  );
  const { data: notificationMessagesSearch } = useNotificationData(
    1,
    99999,
    undefined,
    { is_read: true }
  );
  console.log(
    "🚀 ~ List ~ notificationMessagesSearch:",
    notificationMessagesSearch
  );

  const headCells = useCallback(
    (): IHeaderCell<NotificationDataApi>[] => [
      {
        id: "user_id",
        label: "user",
        isCenter: true,
        RenderRow: ({ value }) => {
          const { data: departmentById } = useGetUserById(String(value));
          const { first_name, last_name } =
            (departmentById as { data: UserDataApi } | undefined)?.data ?? {};
          return <>{`${first_name} ${last_name}`}</>;
        },
      },
      { id: "title", label: "title", isCenter: true },
      { id: "message", label: "message", isCenter: true },
      // {
      //   id: "id",
      //   label: "actions",
      //   RenderRow: ({ value }) => {
      //     const [open, setOpen] = useState(false);
      //     const { mutateAsync: notifDelete, isLoading } =
      //       useDeleteNotification();
      //     const navigate = useNavigate();

      //     return (
      //       <>
      //         <>
      //           <Grid sx={{ display: "flex" }}>
      //             <IconsTable
      //               title="edit"
      //               icon={editICON()}
      //               onClick={() => navigate(`edit/${value}`)}
      //             />
      //             <IconsTable
      //               title="delete"
      //               icon={trashICON()}
      //               onClick={() => setOpen(true)}
      //             />
      //           </Grid>
      //         </>
      //         <CustomDialogMessage
      //           type="delete"
      //           open={open}
      //           onClose={() => setOpen(false)}
      //           loading={false}
      //           onSubmit={async () =>
      //             tryCatchHandler({
      //               handler: async () => {
      //                 const data = await notifDelete(value);

      //                 setOpen(false);
      //                 return data;
      //               },

      //               successMessage: "successfully deleted",
      //             })
      //           }
      //         />
      //       </>
      //     );
      //   },
      //   isCenter: true,
      // },
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
          title: "Notifications",
          buttonInsert: "Add Notification",
        }}
        handleInsertButton={() => setInsertToggleModal(!insertToggleModal)}
        tabData={[
          {
            color: COLOR_MUTED_TEXT,
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
                  is_read: true,
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
                  is_read: false,
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
