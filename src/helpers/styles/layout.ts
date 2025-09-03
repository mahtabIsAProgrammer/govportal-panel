import type { SxProps, Theme } from "@mui/material";
import { SIDE_BAR_SIZE } from "../constants/statics";

export const DashboardLayoutSX = (
  theme: string,
  sidebarSize: TSidebarSize
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  "& content": {
    backgroundColor: theme === "light" ? " " : "   ",
    width: `calc(100% - ${SIDE_BAR_SIZE[sidebarSize]})`,
    overflow: "auto",
    transition: ".2s all",
  },
  "& .pages": {
    scrollBehavior: "smooth",
    animation: "fadeIn 0.3s",
    height: "100vh",
    padding: "20px",
    "& .items": {
      maxWidth: "1500px",
      margin: "auto",
      height: "100%",
    },
  },
});
