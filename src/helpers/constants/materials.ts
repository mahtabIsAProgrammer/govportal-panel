import type { SxProps, Theme } from "@mui/material";

import { SPACE_XS } from "./spaces";
import { FONT_CAPTION, FONT_WEIGHT_MEDUIM } from "../constants/fonts";

export const ERROR_MESSAGE_STYLE = (disabled?: boolean): SxProps<Theme> => ({
  width: "100%",
  gap: SPACE_XS,
  display: "flex",
  marginTop: SPACE_XS,
  alignItems: "center",
  opacity: disabled ? 0.3 : 1,
  "& .text-icon": {
    color: "#919EAB",
    fontSize: FONT_CAPTION,
    fontWeight: FONT_WEIGHT_MEDUIM,
  },
  "& .icon": {
    width: "20px",
    height: "20px",
  },
});
