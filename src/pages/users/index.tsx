import { Grid } from "@mui/material";
import { useContext, type FC } from "react";
import { useNavigate } from "react-router-dom";

import { useUserData } from "../../services/hooks/users";
import { IconsTable } from "../../components/common/IconTable";
import { MainContext } from "../../helpers/others/mainContext";
import { COLOR_PRIMARY } from "../../helpers/constants/colors";
import { PageProvider } from "../../components/advances/PageProvider";
import type { UserDataApi } from "../../services/configs/apiEndPoint";
import { editICON, eyeIcon } from "../../components/other/FunctionalSVG";
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
        title: "Dashboard",
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
    id: "id",
    label: "Name",
    isCenter: true,
    RenderRow: ({ row }) => <>{`${row?.first_name} ${row?.last_name}`}</>,
  },
  { id: "username", label: "User Name", isCenter: true },
  { id: "email", label: "Email", isCenter: true },
  { id: "role", label: "Role", isCenter: true },
  {
    id: "id",
    label: "actions",
    RenderRow: ({ value }) => {
      const navigate = useNavigate();
      return (
        <>
          <Grid sx={{ display: "flex" }}>
            {role == "admin" ? (
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
          </Grid>
        </>
      );
    },
    isCenter: true,
  },
];
