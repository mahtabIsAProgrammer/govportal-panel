import type { SxProps, Theme } from "@mui/material";

import {
  FONT_TITLE,
  FONT_BUTTON,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
  FONT_BODY,
} from "../../constants/fonts";
import {
  COLOR_WHITE,
  COLOR_SECONDRY,
  COLOR_MUTED_TEXT,
  COLOR_INFO,
  COLOR_PRIMARY,
} from "../../constants/colors";
import { SPACE_MD, SPACE_SM, SPACE_XL } from "../../constants/spaces";

export const loginSX = (isRegister?: boolean): SxProps<Theme> => ({
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
      maxWidth: isRegister ? "50%" : "350px",
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
      "& .inputs-container": {
        width: "100%",
        justifyContent: "space-between",
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
        mt: isRegister ? SPACE_MD : "",
        justifyContent: isRegister ? "space-between" : "end",
        alignItems: "center",
        "& .button": {
          width: isRegister ? "300px" : "100%",
          alignItems: "center",
          fontSize: FONT_BUTTON,
          backgroundColor: COLOR_PRIMARY,
          color: COLOR_WHITE,
          "& span": {
            pr: SPACE_SM,
          },
        },
      },
      "& .no-acount-wrapper": {
        display: "flex",
        justifyContent: "space-between",
        mt: isRegister ? 0 : SPACE_MD,
        alignItems: "center",
        gap: isRegister ? SPACE_MD : 0,
        "& p": {
          fontSize: FONT_BODY,
          fontWeight: "400",
        },
        "& .sign-up-btn": {
          color: COLOR_INFO,
          cursor: "pointer",
          fontSize: FONT_SMALL_TEXT,
          textDecorationLine: "underline",
          "&:hover": {
            transition: "0.3s",
            scale: "1.1",
          },
        },
      },
    },
  },
});
