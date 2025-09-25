import type { FC, JSX, ReactNode } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { SPACE_MD } from "../../helpers/constants/spaces";
import { FONT_BODY } from "../../helpers/constants/fonts";
import { CustomDialog } from "../controllers/CustomDialog";
import { COLOR_RED } from "../../helpers/constants/colors";
import { CustomImageBox } from "../controllers/CustomImage";
import { CustomButton, CustomLoadingButton } from "../controllers/CustomButton";

import deleted from "../../assets/images/delete.webp";
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
  const {
    title,
    cancelButton,
    content,
    component,
    image,
    submitButton,
    subtitle,
  } = texts ?? {};
  return (
    <CustomDialog
      size={size ?? "small"}
      open={open}
      dialogTitle={{
        hasCloseIcon: true,
        closeIconHandler: onClose,
        titleText: title || (type == "delete" ? "delete" : ""),
        subtitle: subtitle,
        image: type == "delete" ? undefined : image,
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
              width="170px"
              height="170px"
            />
          ) : type == "delete" ? (
            <CustomImageBox
              variant="rounded"
              src={deleted}
              width="170px"
              height="170px"
              sx={{
                width: "170px",
                height: "auto",
              }}
            />
          ) : (
            <></>
          )}

          <>
            <Typography
              sx={{
                fontSize: FONT_BODY,
                fontWeight: "600",
                marginX: "auto",
                mt: SPACE_MD,
              }}
              variant="caption"
            >
              {content ||
                (type == "delete" ? "Are you sure to delete the item?" : "")}
            </Typography>
            {component}
          </>
        </Box>
      }
      dialogAction={
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            gap: SPACE_MD,
            mt: SPACE_MD,
          }}
        >
          <CustomButton
            fullWidth
            text={cancelButton ? cancelButton : "cancel"}
            size="large"
            variant="outlined"
            onClick={onCancel ?? onClose}
            customColor={COLOR_RED}
          />
          <CustomLoadingButton
            fullWidth
            text={
              submitButton ? submitButton : type == "delete" ? "deleted" : "yes"
            }
            size="large"
            color={type == "delete" ? "error" : "primary"}
            onClick={onSubmit}
            loading={loading}
            variant="contained"
          />
        </Grid>
      }
    />
  );
};
