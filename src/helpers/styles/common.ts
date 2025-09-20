import type { SxProps, Theme } from "@mui/material";

import { COLOR_BORDER } from "../constants/colors";

export const seeAllNotifyButton = (scrollTop: boolean): SxProps<Theme> => ({
  pt: "20px",
  display: "flex",
  position: "sticky",
  justifyContent: "center",
  borderTop: "1px solid" + COLOR_BORDER,
  "& svg": {
    transition: "transform 0.5s",
    transform: scrollTop ? "rotate(180deg)" : undefined,
  },
});
