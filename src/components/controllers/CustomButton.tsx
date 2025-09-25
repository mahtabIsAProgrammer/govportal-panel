import {
  Button,
  type Theme,
  Typography,
  type SxProps,
  type ButtonTypeMap,
  type ButtonBaseProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { type AriaAttributes, type DOMAttributes, memo } from "react";

import { CustomIcon } from "./CustomImage";
import { SPACE_XS } from "../../helpers/constants/spaces";
import { FONT_BUTTON } from "../../helpers/constants/fonts";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../helpers/constants/colors";

import loading from "../../assets/images/loading-white.gif";

export type TCustomButton = ButtonTypeMap<
  {
    text: string;
    customColor?: string;
    customWidth?: string;
  },
  "button"
>["props"] &
  ButtonBaseProps &
  DOMAttributes<unknown>;

export type TLoadingButton = ButtonTypeMap<
  {
    text: string;
    customColor?: string;
    customWidth?: string;
  },
  "button"
>["props"] &
  ButtonBaseProps &
  DOMAttributes<unknown> &
  AriaAttributes;

export const CustomButton = memo<TCustomButton>(
  ({ text, sx, variant, customColor, customWidth, ...props }) => {
    const mergeSx = {
      ...buttonSX(customColor || COLOR_PRIMARY, customWidth),
      ...(sx || {}),
    };

    return (
      <Button sx={mergeSx} variant={variant || "contained"} {...props}>
        <Typography className="button-text">{text}</Typography>
      </Button>
    );
  }
);

export const CustomLoadingButton = memo<TLoadingButton>(
  ({ text, variant, customColor, customWidth, ...props }) => {
    return (
      <LoadingButton
        loadingPosition={"end"}
        className={"loading-button"}
        variant={variant}
        loadingIndicator={
          <CustomIcon
            src={variant == "outlined" || variant == "text" ? loading : loading}
          />
        }
        endIcon={<></>}
        sx={buttonSX(customColor || COLOR_PRIMARY, customWidth)}
        {...props}
      >
        <Typography className="button-text">{text}</Typography>
      </LoadingButton>
    );
  }
);

const buttonSX = (
  customColor: string,
  customWidth?: string
): SxProps<Theme> => ({
  gap: SPACE_XS,
  borderRadius: "8px",
  fontWeight: "700",
  textTransform: "capitalize",
  width: customWidth,
  "& .button-text": {
    width: "max-content",
    textAlign: "center",
    fontWeight: "600",
    fontSize: FONT_BUTTON,
  },
  "&.MuiButtonBase-root": {
    "&.MuiButton-contained": {
      background: customColor,
      transition: "0.3s",
      border: `1px solid ${
        "transparent"
        // customColor == COLOR_LIGHT_GRAY ? customColor + "40" : customColor
      }`,
      "&.Mui-disabled": {
        color: COLOR_WHITE,
        backgroundColor: `${customColor}40`,
      },
      "&:hover": {
        boxShadow: "none",
        mixBlendMode: "multiply",
        backdropFilter: "brightness(0.96)",
      },
    },
    "&.MuiButton-outlined": {
      color: customColor,
      backgroundColor: COLOR_WHITE,
      border: `1px solid ${
        customColor == "#A3A3A3" ? customColor + "40" : customColor
      }`,
      "&.Mui-disabled": {
        backgroundColor: `${customColor}30`,
        opacity: 0.4,
      },
      "&:hover": {
        backgroundColor: `${customColor}10`,
      },
    },
    "&.MuiButton-text": {
      backgroundColor: "transparent",
      color: customColor,
      "&.Mui-disabled": {
        opacity: 0.4,
      },
      "&:hover": {
        backgroundColor: `${customColor}10`,
      },
    },
    "& .MuiButton-endIcon": {
      mx: "0px",
    },
    "& .MuiButton-startIcon": {
      mx: "0px",
    },
  },
});
