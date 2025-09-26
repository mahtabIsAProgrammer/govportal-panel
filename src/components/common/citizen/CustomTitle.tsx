import { memo } from "react";
import { Grid, Typography, type SxProps, type Theme } from "@mui/material";

import {
  COLOR_SECONDRY,
  COLOR_PRIMARY_TEXT,
} from "../../../helpers/constants/colors";
import { arrowCrookedIcon } from "../../other/FunctionalSVG";
import { SPACE_MD } from "../../../helpers/constants/spaces";
import { FONT_SMALL_TEXT } from "../../../helpers/constants/fonts";

interface ICustomTitle {
  title?: string;
  description?: string;
  setting?: {
    color?: string;
    iconColor?: string;
  };
}

export const CustomTitle = memo<ICustomTitle>(
  ({ title, description, setting }) => {
    const { color, iconColor } = setting ?? {};
    return (
      <Grid sx={{ display: "flex", flexDirection: "column", gap: SPACE_MD }}>
        <Typography sx={customTitle(iconColor, color)}>
          {title}
          {arrowCrookedIcon(iconColor)}
          {/* <Box component="img" className="vector-image" src={backImage} /> */}
        </Typography>
        {description && (
          <Typography
            sx={{ color: "#747474", fontSize: FONT_SMALL_TEXT, width: "52%" }}
          >
            {description}
          </Typography>
        )}
      </Grid>
    );
  }
);

const customTitle = (iconColor?: string, color?: string): SxProps<Theme> => ({
  gap: "30px",
  display: "flex",
  fontWeight: "700",
  width: "fit-content",
  position: "relative",
  alignItems: "center",
  fontSize: { xs: "27px", md: "34px" },
  color: color || COLOR_PRIMARY_TEXT,
  justifyContent: "space-between",
  borderBottom: "2px solid" + (iconColor || COLOR_SECONDRY),
  "& .vector-image": {
    left: "-45px",
    width: "100px",
    height: "100px",
    bottom: "-32px",
    position: "absolute",
    zIndex: 22000,
    display: { xs: "none", md: "block" },
  },
});
