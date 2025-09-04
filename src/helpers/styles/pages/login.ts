import type { SxProps, Theme } from "@mui/material";

import {
  FONT_TITLE,
  FONT_BUTTON,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
} from "../../constants/fonts";
import {
  COLOR_WHITE,
  COLOR_SECONDRY,
  COLOR_MUTED_TEXT,
} from "../../constants/colors";
import { SPACE_MD, SPACE_SM, SPACE_XL } from "../../constants/spaces";

export const loginSX: SxProps<Theme> = {
  width: "100%",
  height: "100vh",
  "& .container": {
    width: "100%",
    height: { xs: "auto", md: "100%" },
    py: { xs: "12px", md: 0 },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLOR_WHITE,
    "& .inputs-wrapper": {
      width: "fit-content",
      maxWidth: "350px",
      "& .title-wrapper": {
        mb: { xs: "10px", md: SPACE_XL },
        width: "100%",
        "& .title": {
          fontSize: FONT_TITLE,
          fontWeight: FONT_WEIGHT_BLOD,
        },
        "& .subtitle": {
          color: COLOR_MUTED_TEXT,
          fontSize: FONT_SMALL_TEXT,
          fontWeight: FONT_WEIGHT_BLOD,
          "& span": {
            cursor: "pointer",
            color: COLOR_SECONDRY,
            textDecoration: "underline",
          },
        },
      },
      "& .inputs": {
        width: "350px",
        display: "flex",
        rowGap: SPACE_MD,
        flexDirection: "column",
        "& .input": {
          "& .MuiInputBase-root": {
            height: "45px",
            borderRadius: "8px",
          },
        },
      },
      "& .buttons-wrapper": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "& .button": {
          alignItems: "center",
          fontSize: FONT_BUTTON,
          "& span": {
            pr: SPACE_SM,
          },
        },
      },
    },
  },
};
