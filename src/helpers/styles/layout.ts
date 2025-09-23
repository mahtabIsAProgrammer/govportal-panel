import type { SxProps, Theme } from "@mui/material";

import { NAVBAR_HEIGHT_SIZE, SIDE_BAR_SIZE } from "../constants/statics";
import {
  COLOR_BACKGROUND,
  COLOR_DARK_BACKGROUND,
  COLOR_WHITE,
} from "../constants/colors";

export const DashboardLayoutSX = (
  theme: string,
  sidebarSize: TSidebarSize
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  "& .content": {
    backgroundColor:
      theme === "light" ? COLOR_BACKGROUND : COLOR_DARK_BACKGROUND,
    width: `calc(100% - ${SIDE_BAR_SIZE[sidebarSize]})`,
    overflow: "auto",
    transition: ".2s all",
  },
  "& .pages": {
    scrollBehavior: "smooth",
    animation: "fadeIn 0.3s",
    height: `calc(100vh - ${NAVBAR_HEIGHT_SIZE})`,
    padding: "20px",
    "& .items": {
      maxWidth: "1500px",
      margin: "auto",
      height: "100%",
    },
  },
});

export const citizenLayoutSX = (theme: string): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  // minHeight: "100vh",
  "& .content": {
    backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_DARK_BACKGROUND,
    width: "100%",
    overflow: "auto",
    transition: ".2s all",
    position: "relative",
    "& .navbar-wrapper": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    "& .container": {
      width: "100%",
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});
