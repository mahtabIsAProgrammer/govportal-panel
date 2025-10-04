import type { SxProps, Theme } from "@mui/material";

import {
  SPACE_LG,
  SPACE_SM,
  SPACE_XL,
  SPACE_2XL,
} from "../../constants/spaces";
import {
  COLOR_BORDER,
  COLOR_PRIMARY_TEXT,
  COLOR_DESCRIPTION_DARK,
} from "../../constants/colors";
import { FONT_TITLE } from "../../constants/fonts";
import { MAX_WIDTH_CITIZEN } from "../../constants/statics";

export const departmentCitizenPageSX: SxProps<Theme> = {
  "&.department-citizen-page": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: { xs: SPACE_2XL, md: "" },
    "& .contnet": {
      mt: { xs: SPACE_2XL, md: "" },
      width: "100%",
      height: { xs: "100%", md: "100vh" },
      maxWidth: MAX_WIDTH_CITIZEN,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      "& .service-wrapper": {
        width: "100%",
        gap: SPACE_LG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "" },
      },
    },
  },
};

export const requestCitizenPageSX: SxProps<Theme> = {
  "&.request-citizen-page": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    // backgroundColor: COLOR_WHITE,
    flexDirection: "column",
    // mt: SPACE_2XL,
    "& .container": {
      my: SPACE_2XL,
      width: "100%",
      p: SPACE_LG,
      maxWidth: MAX_WIDTH_CITIZEN,
      display: "flex",
      flexDirection: "column",
      gap: SPACE_XL,
      "& .texts-wrapper": {
        width: "100%",
        display: "flex",
        mt: SPACE_2XL,
        flexDirection: "column",
        gap: SPACE_SM,
        "& .name": {
          fontSize: FONT_TITLE,
          fontWeight: "700",
          color: COLOR_PRIMARY_TEXT,
        },
        "& .description": {
          color: COLOR_DESCRIPTION_DARK,
          ml: SPACE_SM,
        },
      },
      "& .inputs-container-wrapper": {
        p: SPACE_LG,
        borderRadius: "0",
        display: "flex",
        alignItems: "center",
        minHeight: "400px",
        // boxShadow: "1px -1px 25px -2px rgba(211,193,193,1)",
        border: `1px solid ${COLOR_BORDER}`,
        "& .inputs-wrapper": {
          columnGap: "18px",
          // justifyContent: "center",
          "& .MuiButton-root": {
            mt: SPACE_LG,
          },
        },
      },
    },
  },
};
