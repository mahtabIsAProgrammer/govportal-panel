import { Box, Grid } from "@mui/material";
import type { FC, JSX, ReactNode } from "react";

import { dialogDeleteICON } from "../other/FunctionalSVG";
import { SPACE_XL } from "../../helpers/constants/spaces";
import { CustomDialog } from "../controllers/CustomDialog";
import { CustomImageBox } from "../controllers/CustomImage";
import { CustomButton, CustomLoadingButton } from "../controllers/CustomButton";

interface ICustomDialogMessage {
  icon?: string;
  type?: "delete" | "other";
  texts?: {
    title: string;
    content?: string;
    submitButton?: string;
    cancelButton?: string;
    subtitle?: string;
    image?: JSX.Element;
    component?: ReactNode;
  };
  open: boolean;
  loading: boolean;
  onClose: TEmptyVoidFunction;
  onCancel?: TEmptyVoidFunction;
  onSubmit: TEmptyVoidFunction;
  size?: TDialogSize;
}

export const CustomDialogMessage: FC<ICustomDialogMessage> = ({
  loading,
  onClose,
  onSubmit,
  open,
  icon,
  onCancel,
  size,
  texts,
  type,
}) => {
  const { title, cancelButton, component, image, submitButton, subtitle } =
    texts ?? {};
  return (
    <CustomDialog
      size={size ?? "small"}
      open={open}
      onClose={onClose}
      dialogTitle={{
        hasCloseIcon: true,
        closeIconHandler: onClose,
        titleText: title || (type == "delete" ? "delete" : ""),
        subtitle: subtitle,
        image: type == "delete" ? dialogDeleteICON() : image,
      }}
      isCenter
      content={
        <Box
          className="content-wrapper"
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            height: icon ? "170px" : "",
            width: "100%",
          }}
        >
          {icon ? (
            <CustomImageBox
              variant="rounded"
              src={icon}
              sx={{
                width: "170px",
                height: "auto",
              }}
            />
          ) : undefined}

          {component}
        </Box>
      }
      dialogAction={
        <Grid sx={{ width: "100%", display: "flex", gap: SPACE_XL }}>
          <CustomButton
            sx={{ width: "100%" }}
            fullWidth
            text={cancelButton ? cancelButton : "cancel"}
            size="large"
            variant="outlined"
            onClick={onCancel ?? onClose}
          />
          <CustomLoadingButton
            sx={{ width: "100%" }}
            fullWidth
            text={
              submitButton ? submitButton : type == "delete" ? "deleted" : "yes"
            }
            size="large"
            onClick={onSubmit}
            loading={loading}
            variant="contained"
            // customColor={type == "delete" ? COLOR_ERROR : COLOR_PRIMARY}
          />
        </Grid>
      }
    />
  );
};
