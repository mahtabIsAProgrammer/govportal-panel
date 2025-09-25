import { Box, Grid, Typography } from "@mui/material";
import { homeSectionSX } from "../../helpers/styles/sections";
import { CustomImageBox } from "../controllers/CustomImage";

import vector from "../../assets/images/Vector.png";
import homePicture from "../../assets/images/government-pic.webp";

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
          Lorem ipsum dolor sit amet , consectetur adipiscing elit, sed do
          eiusmod eiusmod tempo incididunt ut labore et dolore magna aliqua.
          Egestas purus eiusmod viverra accumsan in nisl nisi. Arcu cursus vitae
          congue mauris rhoncus aenean is aenean scelerisque.
        </Typography>
        <CustomImageBox src={vector} />
      </Grid>
      <Grid className="right-side">
        <CustomImageBox src={homePicture} />
      </Grid>
    </Grid>
  );
};
