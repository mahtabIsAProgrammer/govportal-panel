import type { SxProps, Theme } from "@mui/material";

import {
  SPACE_LG,
  SPACE_SM,
  SPACE_XL,
  SPACE_2XL,
} from "../../constants/spaces";
import { FONT_TITLE } from "../../constants/fonts";
import { MAX_WIDTH_CITIZEN } from "../../constants/statics";
import { COLOR_MUTED_TEXT, COLOR_WHITE } from "../../constants/colors";

export const departmentCitizenPageSX: SxProps<Theme> = {
  "&.department-citizen-page": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .contnet": {
      width: "100%",
      height: "100vh",
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
      },
    },
  },
};

export const requestCitizenPageSX: SxProps<Theme> = {
  "&.request-citizen-page": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: COLOR_WHITE,
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
        },
        "& .description": {
          color: COLOR_MUTED_TEXT,
          ml: SPACE_SM,
        },
      },
      "& .inputs-container-wrapper": {
        p: SPACE_LG,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        minHeight: "400px",
        boxShadow: "1px -1px 25px -2px rgba(211,193,193,1)",
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
