import { Grid } from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

import { IconsTable } from "../../components/common/IconTable";
import { tryCatchHandler } from "../../helpers/utils/handlers";
import { PageProvider } from "../../components/advances/PageProvider";
import { useNotificationData } from "../../services/hooks/notifications";
import { editICON, trashICON } from "../../components/other/FunctionalSVG";
import type { IHeaderCell } from "../../components/controllers/CustomTable";
import type { NotificationDataApi } from "../../services/configs/apiEndPoint";
import { CustomDialogMessage } from "../../components/common/CustomDialogMessages";

const List: FC = () => {
  return (
    <PageProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Notification", link: "", type: "list" },
      ]}
      texts={{
        title: "Dashboard",
        buttonInsert: "Add Notification",
      }}
      buttonLink="add"
      tableData={{
        useListRows: useNotificationData,
        tableOptions: {
          hasIndex: true,
          headerCells: userHeadCells,
        },
      }}
    />
  );
};

export default List;

const userHeadCells: IHeaderCell<NotificationDataApi>[] = [
  {
    id: "user_id",
    label: "Name",
    isCenter: true,
  },
  { id: "message", label: "Email", isCenter: true },
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
          {
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
          }
        </>
      );
    },
    isCenter: true,
  },
];
