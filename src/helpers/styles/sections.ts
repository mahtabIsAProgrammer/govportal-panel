import type { SxProps, Theme } from "@mui/material";

import { SPACE_LG } from "../constants/spaces";
import { MAX_WIDTH_CITIZEN } from "../constants/statics";
import { COLOR_PRIMARY, COLOR_PRIMARY_TEXT } from "../constants/colors";

export const homeSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  height: "100vh",
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "space-between",
  "& .left-side": {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: SPACE_LG,
    "& .title": {
      fontWeight: "800",
      fontSize: "68px",
      color: COLOR_PRIMARY_TEXT,
      lineHeight: "80px",
      "& .span": {
        color: COLOR_PRIMARY,
      },
    },
    "& .description": {
      color: "#737373",
      fontSize: "16px",
      fontWeight: "500",
    },
    "& .image-box-wrapper": {
      position: "absolute",
      width: "580px",
      height: "100px",
      bottom: "124px",
      left: "160px",
    },
  },
  "& .right-side": {
    width: "40%",
    "& .image-box-wrapper": {
      width: "100%",
      height: "500px",
    },
  },
};

export const serviceSectionSX: SxProps<Theme> = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: COLOR_PRIMARY + 40,
  "& .service-container": {
    display: "flex",
    flexDirection: "column",
    maxWidth: MAX_WIDTH_CITIZEN,
    justifyContent: "space-evenly",
    "& .serivces-wrapper": {
      width: "100%",
      gap: SPACE_LG,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
};

export const departmentSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  "& .department-wrapper": {
    width: "100%",
    gap: SPACE_LG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
