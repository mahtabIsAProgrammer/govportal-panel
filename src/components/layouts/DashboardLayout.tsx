import { Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { Suspense, useContext, type FC } from "react";

import { Navbar } from "../common/Navbar";
import { Sidebar } from "../common/Sidebar";
import { AccessDenied } from "../common/AccessDenied";
import { Loading, LoadingSideBar } from "../common/Loading";
import { MainContext } from "../../helpers/others/mainContext";
import { DashboardLayoutSX } from "../../helpers/styles/layout";

export const DashboardLayout: FC = () => {
  const {
    theme,
    sidebarSize,
    isLoadingProfileInformation,
    globalProfileInformation: { role },
    routes: { dashboardRoutes },
  } = useContext(MainContext);

  const content = useRoutes(dashboardRoutes);
  return role == "citizen" ? (
    <AccessDenied />
  ) : (
    <Grid container sx={DashboardLayoutSX(theme, sidebarSize)}>
      {isLoadingProfileInformation ? <LoadingSideBar /> : <Sidebar />}
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
