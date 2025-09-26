import { Grid } from "@mui/material";

import View from "../requests/View";

const MyRequestView = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
