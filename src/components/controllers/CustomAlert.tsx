import { closeSnackbar } from "notistack";
import { memo, type ReactNode } from "react";
import { Grid, Alert, type Theme, type SxProps, Stack } from "@mui/material";

import {
  COLOR_RED,
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_WHITE,
  COLOR_YELLOW,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { CustomButton } from "./CustomButton";
import { FONT_BODY } from "../../helpers/constants/fonts";
import { SPACE_SM, SPACE_XS, SPACE_MD } from "../../helpers/constants/spaces";

interface ICustomAlert {
  message: string;
  onClose: () => void;
  iconAlert?: ReactNode;
  className?: string;
}

export const CustomAlert = memo<ICustomAlert>(
  ({ message, onClose, className, iconAlert }) => {
    return (
      <Stack sx={alertSX}>
        <Alert
          icon={iconAlert}
          onClose={onClose}
          className={className + " alert"}
        >
          {message}
        </Alert>
      </Stack>
    );
  }
);

const alertSX: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  padding: undefined,
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",

  "& .alert": {
    gap: SPACE_SM,
    width: "340px",
    height: "65px",
    display: "flex",
    color: COLOR_PRIMARY_TEXT,
    margin: undefined,
    padding: undefined,
    alignItems: "center",
    alignContent: "center",
    fontSize: FONT_BODY,
    fontWeight: "600",

    backgroundColor: COLOR_WHITE,
    justifyContent: "space-between",
    boxShadow: "0px 0px 16px 0px rgba(145, 158, 171, 0.16)",
  },
  "& .MuiAlert-action": {
    margin: undefined,
  },
  "& button": {
    mb: SPACE_XS,
    mx: "12px",
    color: "#637381",
    "& svg": {
      width: "14px",
      height: "14px",
      fontWeight: "500",
    },
  },
  "& .icon-check-success": {
    width: "22px",
    height: "22px",
    padding: SPACE_SM,
    color: COLOR_GREEN,

    backgroundColor: `${COLOR_GREEN}30`,
  },
  "& .icon-warning": {
    width: "22px",
    height: "22px",
    padding: SPACE_SM,
    color: COLOR_YELLOW,

    backgroundColor: `${COLOR_YELLOW}30`,
  },
  "& .icon-danger": {
    gap: SPACE_MD,
    width: "22px",
    height: "22px",
    padding: SPACE_SM,
    color: COLOR_RED,

    backgroundColor: `${COLOR_RED}30`,
  },
  "& .icon-info": {
    width: "22px",
    height: "22px",
    padding: SPACE_SM,
    color: COLOR_BLUE,

    backgroundColor: `${COLOR_BLUE}30`,
  },
  "& .MuiAlert-icon": {
    ml: "12px",
  },
};

export const ActionAlert = ({
  onClickOk,
  snackbarId,
  onClickCancel,
}: IActionAlert) => {
  return (
    <Grid sx={actionAlertSX}>
      <CustomButton
        sx={{
          width: "100px !important",
          height: "40px !important",
          fontSize: "14px !important",
        }}
        onClick={() => {
          onClickOk();
          closeSnackbar(snackbarId);
        }}
        variant="contained"
        text={"accept"}
      />

      <CustomButton
        sx={{
          height: "40px !important",
          width: "100px !important",
          fontSize: "14px !important",
        }}
        onClick={() => (
          closeSnackbar(snackbarId), onClickCancel && onClickCancel()
        )}
        variant="outlined"
        text={"cancel"}
      />
    </Grid>
  );
};

const actionAlertSX: SxProps<Theme> = {
  ml: SPACE_MD,
  gap: SPACE_XS,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& button": {
    fontSize: "10px",
  },
};
