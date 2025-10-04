import { Box, Grid, Typography } from "@mui/material";

import { homeSectionSX } from "../../helpers/styles/sections";

export const HomeSection = () => {
  return (
    <Grid sx={homeSectionSX}>
      <Grid className="left-side">
        <Typography className="title">
          Welcome To{" "}
          <Box component="span" className="span">
            Government{" "}
          </Box>
          Portal
        </Typography>
        <Typography className="description">
          Welcome to GovPortal, your one-stop platform for accessing government
          services online. Here, you can easily explore available public
          services, submit requests, and track their progress in real time. No
          more standing in lines or dealing with paperwork — everything is
          digital, secure, and transparent. You can make payments safely through
          our integrated payment system. Stay informed with notifications about
          your service updates and approvals. GovPortal connects you directly
          with government departments and officers. Empowering citizens through
          faster, simpler, and smarter public service access.
        </Typography>
        {/* <CustomImageBox src={vector} /> */}
      </Grid>
      {/* <Grid className="right-side">
        <CustomImageBox src={homePicture} />
      </Grid> */}
    </Grid>
  );
};
