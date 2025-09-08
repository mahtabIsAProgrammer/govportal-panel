import {
  Grid,
  Alert,
  Snackbar,
  type Theme,
  type SxProps,
  type AlertColor,
} from "@mui/material";
import { memo } from "react";
import { closeSnackbar } from "notistack";

import { CustomButton } from "./CustomButton";
import { SPACE_MD, SPACE_XS } from "../../helpers/constants/spaces";

interface ICustomAlert {
  open: boolean;
  message: string;
  onClose: () => void;
  severity: AlertColor;
}

export const CustomAlert = memo<ICustomAlert>(
  ({ open, message, severity, onClose }) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);

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
