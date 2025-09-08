import { memo, type JSX, type MouseEvent, type ReactNode } from "react";

import {
  Grid,
  Dialog,
  Divider,
  type Theme,
  Typography,
  IconButton,
  DialogTitle,
  type SxProps,
  DialogContent,
  DialogActions,
  type DialogProps,
} from "@mui/material";
import { merge } from "lodash";

import {
  FONT_WEIGHT_BLOD,
  FONT_HEADING_SMALL,
} from "../../helpers/constants/fonts";
import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_2XL,
} from "../../helpers/constants/spaces";
import { CustomIcon } from "./CustomImage";
import { clearICON } from "../other/FunctionalSVG";
import { COLOR_BACKGROUND } from "../../helpers/constants/colors";

interface ICustomDialog extends Omit<DialogProps, "content"> {
  isCenter?: boolean;
  size?: TDialogSize;
  content: ReactNode;
  hasHeader?: boolean;
  dialogTitle?: {
    image?: string | ReactNode;
    subtitle?: string;
    titleText?: string;
    hasCloseIcon?: boolean;
    closeIconHandler?: MouseEvent<TAny> | TEmptyVoidFunction | undefined;
  };
  dialogAction: JSX.Element;
  sx?: SxProps<Theme> | undefined;
}

export const CustomDialog = memo<ICustomDialog>(
  ({
    content,
    open,
    sx,
    dialogAction,
    hasHeader,
    dialogTitle,
    isCenter,
    size,
  }) => {
    const { closeIconHandler, hasCloseIcon, image, subtitle, titleText } =
      dialogTitle ?? {};
    const mergeSx = merge({}, dialogSX(isCenter, size), sx);

    return (
      <Dialog sx={mergeSx} open={open}>
        <DialogTitle className="header-title" id="alert-dialog-title">
          {hasCloseIcon && (
            <IconButton
              className="close-icon"
              onClick={(e) => closeIconHandler && (closeIconHandler as TAny)(e)}
            >
              {clearICON()}
            </IconButton>
          )}
          <Grid className="icon-title">
            <CustomIcon src={image} />
            <Grid className="title-wrapper">
              <Typography className="title-text">{titleText}</Typography>
              <Typography className="subtitle">{subtitle}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        {hasHeader && (
          <Divider
            sx={{
              display: "block",
              height: "10px",
              borderStyle: "dashed",
              mx: SPACE_MD,
            }}
          />
        )}
        {dialogAction ? (
          <DialogActions className="dialog-action-box">
            <Grid className="dialog-action-container">{dialogAction}</Grid>
          </DialogActions>
        ) : null}
      </Dialog>
    );
  }
);

const dialogSX = (isCenter?: boolean, size?: TDialogSize): SxProps<Theme> => ({
  width: "100%",
  "& .MuiDialog-paper": {
    width:
      size == "small"
        ? { xs: "100%", md: "405px" }
        : size == "medium"
        ? { xs: "100%", md: "500px" }
        : size == "large"
        ? { xs: "100%", md: "1200px" }
        : size == "fullScreen"
        ? { xs: "100%", md: "100%" }
        : "405px",
    overflow: "visible",
    borderRadius: "12px",
  },
  "& .MuiDialogContent-root": {
    pb: "0px !important",
    px: SPACE_SM,
    display: "flex",
    alignItems: "center",
    justifyContent: isCenter ? "center" : "unset",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgb(0,0,0,0.2)",
  },
  "& .MuiPaper-root": {
    py: SPACE_LG,
    px: { xs: SPACE_MD, md: SPACE_2XL },
    minWidth: { xs: "360px" },
    minHeight: "220px",
    borderRadius: "14px",
    backgroundColor: COLOR_BACKGROUND,
    "& .MuiDialogContent-root": {
      p: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
    "& .MuiDialogTitle-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: 0,
      "& .dialog-title": {
        fontSize: FONT_HEADING_SMALL,
        fontWeight: FONT_WEIGHT_BLOD,
      },
    },
    "& .MuiDialogActions-root": {
      justifyContent: "center",
    },
  },
});
