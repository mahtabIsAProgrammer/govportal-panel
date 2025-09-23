import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState, type FC } from "react";

import {
  eyeIcon,
  editICON,
  notificationICON,
} from "../../components/other/FunctionalSVG";
import { useUserData } from "../../services/hooks/users";
import { IconsTable } from "../../components/common/IconTable";
import { MainContext } from "../../helpers/others/mainContext";
import { COLOR_PRIMARY } from "../../helpers/constants/colors";
import { ProfileCard } from "../../components/common/ProfileCard";
import { NotificationSetting } from "../_root/NotificationSetting";
import { PageProvider } from "../../components/advances/PageProvider";
import type { UserDataApi } from "../../services/configs/apiEndPoint";
import type { IHeaderCell } from "../../components/controllers/CustomTable";

const List: FC = () => {
  const {
    globalProfileInformation: { role },
  } = useContext(MainContext);
  return (
    <PageProvider
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "", type: "list" },
      ]}
      texts={{
        title: "Users",
        buttonInsert: "Add Users",
      }}
      buttonLink="add"
      tableData={{
        useListRows: useUserData,
        tableOptions: {
          hasIndex: true,
          headerCells: userHeadCells(role),
        },
      }}
    />
  );
};

export default List;

const userHeadCells = (role: string): IHeaderCell<UserDataApi>[] => [
  {
    id: "first_name",
    label: "Name",
    isCenter: true,
    RenderRow: ({ row }) => (
      <ProfileCard
        title={{
          text: `${row?.first_name} ${row?.last_name}`,
        }}
        image={{ src: row?.image, variant: "circular" }}
      />
    ),
  },
  { id: "username", label: "User Name", isCenter: true },
  { id: "email", label: "Email", isCenter: true },
  { id: "role", label: "Role", isCenter: true },
  {
    id: "id",
    label: "actions",
    RenderRow: ({ value }) => {
      const navigate = useNavigate();

      const [openNotifyUserDialog, setOpenNotifyUserDialog] =
        useState<boolean>(false);
      return (
        <>
          <Grid sx={{ display: "flex" }}>
            {role === "admin" ? (
              <IconsTable
                title="edit"
                icon={editICON(COLOR_PRIMARY)}
                onClick={() => navigate(`edit/${value}`)}
              />
            ) : (
              ""
            )}
            <IconsTable
              title="view"
              icon={eyeIcon(COLOR_PRIMARY)}
              onClick={() => navigate(`view/${value}`)}
            />
            <IconsTable
              title="Send Notification"
              icon={notificationICON(COLOR_PRIMARY)}
              onClick={() => setOpenNotifyUserDialog(true)}
            />
          </Grid>

          <NotificationSetting
            userId={String(value)}
            insertToggleModal={openNotifyUserDialog}
            setInsertToggleModal={setOpenNotifyUserDialog}
          />
        </>
      );
    },
    isCenter: true,
  },
];
