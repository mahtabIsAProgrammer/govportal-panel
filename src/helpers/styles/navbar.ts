import type { SxProps, Theme } from "@mui/material";

import { FONT_CAPTION } from "../constants/fonts";
import { NAVBAR_HEIGHT_SIZE } from "../constants/statics";
import { SPACE_MD, SPACE_SM, SPACE_XS } from "../constants/spaces";
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

export const languageitemsSX: SxProps<Theme> = {
  width: "180px",
  padding: SPACE_SM,
  backgroundColor: COLOR_WHITE,
  borderRadius: "12px",
  boxShadow:
    "-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",

  "& .select-item": {
    display: "flex",
    gap: SPACE_SM,
    borderRadius: "8px",
    "& .flag-img": {
      width: "28px",
      height: "20px",
      "& svg": {
        borderRadius: "4px",
      },
    },
  },
  "& .text": {
    fontSize: FONT_CAPTION,
    fontWeight: "500",
    marginY: SPACE_XS,
  },
};

export const userInfoSX: SxProps<Theme> = {
  width: "180px",
  padding: SPACE_SM,
  backgroundColor: COLOR_WHITE,
  borderRadius: "12px",
  boxShadow:
    "-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",

  "& .select-item": {
    display: "flex",
    gap: SPACE_SM,
    borderRadius: "8px",
    "& .flag-img": {
      width: "28px",
      height: "20px",
      "& svg": {
        borderRadius: "4px",
      },
    },
  },
  "& .text": {
    fontSize: FONT_CAPTION,
    fontWeight: "500",
    marginY: SPACE_XS,
  },
};
