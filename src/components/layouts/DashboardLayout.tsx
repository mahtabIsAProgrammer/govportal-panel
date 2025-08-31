import { Suspense, useContext, type FC } from "react";
import { useRoutes } from "react-router-dom";
import { MainContext } from "../../helpers/others/mainContext";
import { Grid } from "@mui/material";
import { Loading } from "../common/Loading";
import { Sidebar } from "../common/Sidebar";
import { Navbar } from "../common/Navbar";
import { DashboardLayoutSX } from "../../helpers/styles/layout";

export const DashboardLayout: FC = () => {
  const {
    theme,
    sidebarSize,
    routes: { dashboardRoutes },
  } = useContext(MainContext);

  const content = useRoutes(dashboardRoutes);
  return (
    <Grid container sx={DashboardLayoutSX(theme, sidebarSize)}>
      <Sidebar />
      <Grid className="content">
        <Navbar />
        <Grid className="pages">
          <Grid className="items">
            <Suspense fallback={<Loading />}>{content}</Suspense>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
