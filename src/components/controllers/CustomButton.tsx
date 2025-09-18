import {
  Button,
  type Theme,
  Typography,
  type SxProps,
  type ButtonTypeMap,
  type ButtonBaseProps,
} from "@mui/material";
import { merge } from "lodash";
import { LoadingButton } from "@mui/lab";
import { type AriaAttributes, type DOMAttributes, memo } from "react";

import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { SPACE_LG, SPACE_SM } from "../../helpers/constants/spaces";
import { FONT_BUTTON, FONT_WEIGHT_BLOD } from "../../helpers/constants/fonts";

export type TCustomButton = ButtonTypeMap<
  {
    text: string;
  },
  "button"
>["props"] &
  ButtonBaseProps &
  DOMAttributes<unknown>;

export type TLoadingButton = ButtonTypeMap<
  {
    text: string;
    customColor?: string;
  },
  "button"
>["props"] &
  ButtonBaseProps &
  DOMAttributes<unknown> &
  AriaAttributes;

export const CustomButton = memo<TCustomButton>(
  ({ text, sx, variant, ...props }) => {
    const mergeSx = merge({}, buttonSX, sx);

    return (
      <Button sx={mergeSx} variant={variant || "contained"} {...props}>
        {text}
      </Button>
    );
  }
);

export const CustomLoadingButton = memo<TCustomButton>(({ text, ...props }) => {
  return (
    <LoadingButton
      loadingPosition={"end"}
      className={"loading-button"}
      loadingIndicator={
        ""
        // <CustomIconButton
        //   src={
        //     variant == "outlined" || variant == "text"
        //       ? loadingPrimary
        //       : loadingWhite
        //   }
        // />
      }
      endIcon={<></>}
      sx={buttonSX}
      {...props}
    >
      <Typography className="button-text">{text}</Typography>
    </LoadingButton>
  );
});

const buttonSX: SxProps<Theme> = {
  px: SPACE_LG,
  py: SPACE_SM,
  fontWeight: FONT_WEIGHT_BLOD,
  lineHeight: "22px",
  boxShadow: "none",
  borderRadius: "10px",
  fontSize: FONT_BUTTON,
  textTransform: "capitalize",
  outline: "1px solid transparent",
  "&.MuiButton-contained": {
    transition: "0.3s",
    color: COLOR_WHITE,
    background: COLOR_PRIMARY,
    border: `1px solid transparent`,
  },
  "&.MuiButton-outlined": {
    color: COLOR_PRIMARY_TEXT,
    backgroundColor: "transparent",
    border: `1px solid transparent`,
    "&:hover": {
      color: COLOR_WHITE,
      backgroundColor: COLOR_PRIMARY,
    },
  },
};
