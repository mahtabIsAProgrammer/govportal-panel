import type { SxProps, Theme } from "@mui/material";

import { SPACE_MD, SPACE_XS } from "./spaces";
import {
  FONT_CAPTION,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../constants/fonts";
import { COLOR_PRIMARY } from "./colors";

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

export const STYLE_AUTOCOMPLETE_ITEMS: SxProps<Theme> = {
  fontSize: `${FONT_SMALL_TEXT} !important`,
  overflowY: "auto",
  maxHeight: "150px",
  borderRadius: "12px",
  "&::-webkit-scrollbar": {
    width: "5px",
    marginRight: "5px !important",
  },
  "&::-webkit-scrollbar-track": {
    my: SPACE_MD,
    borderRadius: "14px",
    background: "#0000000A",
  },
  "&::-webkit-scrollbar-thumb": {
    background: COLOR_PRIMARY,
    borderRadius: "14px",
  },
};
