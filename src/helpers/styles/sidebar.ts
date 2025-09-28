import type { SxProps, Theme } from "@mui/material";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_SIDEBAR_HOVER,
  COLOR_DARK_BACKGROUND,
} from "../constants/colors";
import { FONT_BODY } from "../constants/fonts";
import { SIDE_BAR_SIZE } from "../constants/statics";
import { SPACE_MD, SPACE_SM, SPACE_XS } from "../constants/spaces";

export const sidebarSX = (
  theme: TTheme,
  sidebarSize: TSidebarSize
): SxProps<Theme> => ({
  py: SPACE_MD,
  px: SPACE_SM,
  display: "flex",
  height: "100vh",
  transition: ".2s all",
  flexDirection: "column",
  width: SIDE_BAR_SIZE[sidebarSize],
  borderRight: `1px solid ${COLOR_BORDER}`,
  backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_DARK_BACKGROUND,

  "& .logo": {
    width: "100%",
  },
  "& .lists": {
    mt: "30px",
    width: "100%",
    gap: SPACE_XS,
    display: "flex",
    flexDirection: "column",
    "& .links": {
      p: SPACE_SM,
      gap: SPACE_MD,
      display: "flex",
      borderRadius: "0",
      color: COLOR_PRIMARY_TEXT,
      "& .text": {
        fontWeight: "500",
        fontSize: FONT_BODY,
        display: { xs: "none", md: "flex" },
        textTransform: "capitalize",
      },
      "& svg": {
        width: "24px !important",
        height: "24px !important",
      },

      "&:hover": {
        backgroundColor:
          theme == "light" ? COLOR_SIDEBAR_HOVER : COLOR_PRIMARY + 30,
      },
      "&.active": {
        backgroundColor: `${COLOR_PRIMARY}10`,
        color: `${COLOR_PRIMARY} !important`,
        "& p": {
          color: `${COLOR_PRIMARY} !important`,
        },
      },
    },
  },
});
