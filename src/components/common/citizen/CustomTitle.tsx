import { memo } from "react";

import { Typography, type SxProps, type Theme } from "@mui/material";
import { arrowCrookedIcon } from "../../other/FunctionalSVG";
import {
  COLOR_PRIMARY_TEXT,
  COLOR_SECONDRY,
} from "../../../helpers/constants/colors";

interface ICustomTitle {
  title?: string;
  setting?: {
    color?: string;
    iconColor?: string;
  };
}

export const CustomTitle = memo<ICustomTitle>(({ title, setting }) => {
  const { color, iconColor } = setting ?? {};
  return (
    <Typography sx={customTitle(iconColor, color)}>
      {title}
      {arrowCrookedIcon(iconColor)}
      {/* <Box component="img" className="vector-image" src={backImage} /> */}
    </Typography>
  );
});

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
