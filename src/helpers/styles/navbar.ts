import type { SxProps, Theme } from "@mui/material";

import { SPACE_MD } from "../constants/spaces";
import { NAVBAR_HEIGHT_SIZE } from "../constants/statics";
import { COLOR_DARK_BACKGROUND, COLOR_WHITE } from "../constants/colors";

export const navbarSX = (theme: TTheme): SxProps<Theme> => ({
  px: SPACE_MD,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: NAVBAR_HEIGHT_SIZE,
  backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_DARK_BACKGROUND,
});
