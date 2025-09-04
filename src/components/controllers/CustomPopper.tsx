import {
  Box,
  Popper,
  type Theme,
  type SxProps,
  type PopperProps,
  ClickAwayListener,
} from "@mui/material";
import type { FC, ReactNode } from "react";

import { COLOR_WHITE } from "../../helpers/constants/colors";

interface ICustomPopper {
  open: boolean;
  children: ReactNode;
  sx?: SxProps<Theme> | undefined;
  anchorEl?: PopperProps["anchorEl"];
  placement?: PopperProps["placement"];
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
}

export const CustomPopper: FC<ICustomPopper> = ({
  sx,
  open,
  children,
  anchorEl,
  placement,
  onClickAway,
}) => {
  const combinedStyles = { ...popperSX, ...sx };
  return (
    <ClickAwayListener onClickAway={onClickAway ?? (() => undefined)}>
      <Popper
        open={open}
        sx={combinedStyles}
        className="notification"
        anchorEl={anchorEl || null}
        placement={placement || "bottom-end"}
      >
        <Box className="wrapper">{children}</Box>
      </Popper>
    </ClickAwayListener>
  );
};

const popperSX: SxProps<Theme> = {
  zIndex: "400",
  borderRadius: "12px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: COLOR_WHITE,
  boxShadow:
    "-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",
  position: "absolute !important",
};
