import { type FC } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUserData } from "../../services/hooks/users";
import { IconsTable } from "../../components/common/IconTable";
import { editICON } from "../../components/other/FunctionalSVG";
import { PageProvider } from "../../components/advances/PageProvider";
import type { UserDataApi } from "../../services/configs/apiEndPoint";
import type { IHeaderCell } from "../../components/controllers/CustomTable";

const List: FC = () => {
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
          headerCells: userHeadCells,
        },
      }}
    />
  );
};

export default List;

const userHeadCells: IHeaderCell<UserDataApi>[] = [
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
            <IconsTable
              title="edit"
              icon={editICON()}
              onClick={() => navigate(`edit/${value}`)}
            />
          </Grid>
        </>
      );
    },
    isCenter: true,
  },
];
