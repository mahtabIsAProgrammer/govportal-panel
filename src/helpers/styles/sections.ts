import type { SxProps, Theme } from "@mui/material";

import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_DESCRIPTION_LIGHT,
} from "../constants/colors";
import { SPACE_LG, SPACE_XL } from "../constants/spaces";
import { MAX_WIDTH_CITIZEN } from "../constants/statics";

import bgImage from "../../assets/images/back-image.webp";

export const homeSectionSX: SxProps<Theme> = {
  width: "100%",
  height: "100vh",
  display: "flex",
  position: "relative",
  alignItems: "center",
  backgroundSize: "cover",
  justifyContent: "center",
  backgroundPosition: "right",
  backgroundRepeat: "no-repeat",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.7)), 
  url(${bgImage})`,
  "& .left-side": {
    width: "100%",
    pt: { xs: "70px", md: "" },
    maxWidth: MAX_WIDTH_CITIZEN,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACE_LG,
    "& .title": {
      fontWeight: "800",
      fontSize: { xs: "34px", md: "68px" },
      color: COLOR_WHITE,
      lineHeight: { xs: "37px", md: "80px" },
      textAlign: "center",
      "& .span": {
        color: COLOR_PRIMARY,
      },
    },
    "& .description": {
      color: COLOR_DESCRIPTION_LIGHT,
      fontSize: "16px",
      width: { xs: "90%", md: "60%" },
      fontWeight: "500",
      textAlign: "center",
    },
    "& .image-box-wrapper": {
      position: "absolute",
      width: "580px",
      height: "100px",
      bottom: "124px",
      left: "160px",
    },
  },
  // "& .right-side": {
  //   width: "40%",
  //   "& .image-box-wrapper": {
  //     width: "100%",
  //     height: "500px",
  //   },
  // },
};

export const serviceSectionSX: SxProps<Theme> = {
  width: "100%",
  height: { xs: "100%", md: "100vh" },
  display: "flex",
  justifyContent: "center",
  py: { xs: SPACE_XL, md: "" },
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
      justifyContent: { xs: "center", md: "space-between" },
    },
  },
};

export const departmentSectionSX: SxProps<Theme> = {
  width: "100%",
  maxWidth: MAX_WIDTH_CITIZEN,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  py: { xs: SPACE_XL, md: "" },
  height: { xs: "100%", md: "100vh" },
  "& .department-wrapper": {
    width: "100%",
    gap: SPACE_LG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: { xs: "column", md: "row" },
  },
};
