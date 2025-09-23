import type { SxProps, Theme } from "@mui/material";
import { MAX_WIDTH_CITIZEN } from "../constants/statics";
import { SPACE_LG } from "../constants/spaces";

export const homeSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const serviceSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  "& .serivces-wrapper": {
    width: "100%",
    gap: SPACE_LG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const departmentSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  "& .department-wrapper": {
    width: "100%",
    gap: SPACE_LG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
