import { Grid } from "@mui/material";

import View from "../requests/View";
import { SPACE_2XL } from "../../helpers/constants/spaces";

const MyRequestView = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        mt: { xs: SPACE_2XL, md: "" },
        pt: { xs: SPACE_2XL, md: "" },
        "& .view-request-page ": {
          width: "100%",
          maxWidth: "1200px",
          "& .container": {
            minHeight: "300px",
          },
        },
      }}
    >
      <View />
    </Grid>
  );
};

export default MyRequestView;
