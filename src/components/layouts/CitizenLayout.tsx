import { Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { Suspense, useContext } from "react";

import { Loading } from "../common/Loading";
import { MainContext } from "../../helpers/others/mainContext";
import { citizenLayoutSX } from "../../helpers/styles/layout";
import { CitizenNavbar } from "../common/citizen/CitizenNavbar";

export const CitizenLayout = () => {
  const {
    theme,
    routes: { citizenRoutes },
  } = useContext(MainContext);

  const content = useRoutes(citizenRoutes);
  return (
    <Grid sx={citizenLayoutSX(theme)}>
      <Grid className="content">
        <CitizenNavbar />
        <Grid className="container">
          <Suspense fallback={<Loading />}>{content}</Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
};
