import { Grid, Typography } from "@mui/material";
import { FONT_HEADING_LARGE } from "../../helpers/constants/fonts";

export const AccessDenied = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: FONT_HEADING_LARGE, fontWeight: "600" }}>
        Access Denied
      </Typography>
    </Grid>
  );
};
