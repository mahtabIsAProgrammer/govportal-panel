import { Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { useContext } from "react";

import { CitizenLoading } from "../common/Loading";
import { citizenLayoutSX } from "../../helpers/styles/layout";
import { MainContext } from "../../helpers/others/mainContext";
import { CitizenNavbar } from "../common/citizen/CitizenNavbar";

export const CitizenLayout = () => {
  const {
    theme,
    isLoadingProfileInformation,
    routes: { citizenRoutes },
  } = useContext(MainContext);

  const content = useRoutes(citizenRoutes);
  return (
    <Grid sx={citizenLayoutSX(theme)}>
      <Grid className="content">
        <CitizenNavbar />
        <Grid className="container">
          {isLoadingProfileInformation ? <CitizenLoading /> : content}
        </Grid>
      </Grid>
    </Grid>
  );
};
