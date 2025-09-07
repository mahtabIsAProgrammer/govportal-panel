import {
  Stack,
  Chip,
  type ChipProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import { memo } from "react";

import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import { SPACE_MD, SPACE_SM } from "../../helpers/constants/spaces";
import { COLOR_MUTED_TEXT, COLOR_WHITE } from "../../helpers/constants/colors";

export interface IChipProps extends ChipProps {
  className?: string;
  lng?: string;
}
export const CustomChip = memo<IChipProps>(({ ...props }) => {
  const { className } = props;

  return (
    <Stack direction="row" spacing={1} sx={customShipSX}>
      <Chip
        {...{
          ...props,
          className: className + " local-chip",
        }}
      />
    </Stack>
  );
});

const customShipSX: SxProps<Theme> = {
  padding: "0px !important",
  "& .local-chip": {
    width: "100%",
    height: "35px",
    display: "flex",
    textAlign: "right",
    fontStyle: "normal",
    alignItems: "center",
    lineHeight: "normal",
    borderRadius: "50px",
    fontSize: FONT_SMALL_TEXT,
    justifyContent: "center",
  },
  "& .MuiButtonBase-root .MuiChip-label": {
    fontWeight: "400 !important",
  },
  "& .icon-button": {
    opacity: 0.6,
    background: COLOR_WHITE,
    "&:hover": {
      backgroundColor: COLOR_MUTED_TEXT,
    },
  },

  "& .MuiChip-deleteIcon ": {
    fontSize: FONT_SMALL_TEXT,
    margin: "0px !important",
    width: "15px",
    height: "15px",
    marginLeft: `${SPACE_MD} !important`,
  },
  "&  .MuiChip-avatar": {
    margin: "0px !important",
    mr: `${SPACE_SM} !important`,
  },
  "&  .MuiChip-icon": {
    margin: "0px !important",
    marginRight: `${SPACE_SM} !important`,
  },
};
