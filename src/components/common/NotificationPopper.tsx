import {
  Box,
  Fade,
  Grid,
  Typography,
  type Theme,
  type SxProps,
  type PopperProps,
} from "@mui/material";
import { map } from "lodash";
import { memo, type ReactNode } from "react";
import { CustomPopper } from "../controllers/CustomPopper";

import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XS,
} from "../../helpers/constants/spaces";
import {
  COLOR_WHITE,
  COLOR_YELLOW,
  COLOR_MUTED_TEXT,
  COLOR_PRIMARY_TEXT,
  COLOR_SURFACE,
  COLOR_DARK_BACKGROUND,
  COLOR_DARK_BACKGROUND_SURFACE,
} from "../../helpers/constants/colors";
import { clockICON } from "../other/FunctionalSVG";
import { CustomIcon } from "../controllers/CustomImage";
import { FONT_SMALL_TEXT } from "../../helpers/constants/fonts";

interface INotificationPaper {
  open: boolean;
  notificationCount: number;
  dataComponent: ReactNode;
  anchorEl: PopperProps["anchorEl"];
  onClickAway: ((event: MouseEvent | TouchEvent) => void) | undefined;
}

export const NotificationPaper = memo<INotificationPaper>(
  ({ open, anchorEl, onClickAway, dataComponent, notificationCount }) => {
    return (
      <CustomPopper
        open={open}
        sx={notificationPaperSX}
        anchorEl={anchorEl}
        onClickAway={onClickAway}
      >
        <Fade in={open} timeout={700}>
          <Grid className="container-notification-popper">
            <Grid className="header-notification-popper">
              <Typography className="title-notification-popper">
                Notification Message
              </Typography>
              <Box component="div" className="badge-notification-popper">
                {notificationCount}
              </Box>
            </Grid>
            <Grid className="tab-wrapper-popper">{dataComponent}</Grid>
          </Grid>
        </Fade>
      </CustomPopper>
    );
  }
);

export interface ICommentsBox {
  date: string;
  title: string;
  message: string;
  isNew?: boolean;
}

export const CommentBoxContainers = memo(
  ({ data, label }: { data: ICommentsBox[]; label: string }) => {
    return data?.length > 0 ? (
      <Grid sx={notificationBoxContainersSX} className="tab-content-comment">
        <Grid className="comments-wrapper">
          <Typography className="title-comment">{label}</Typography>
          {map(data, ({ date, title, message, isNew }) => (
            <>
              <CommentsBox
                date={date}
                title={title}
                isNew={isNew}
                message={message}
              />
            </>
          ))}
        </Grid>
      </Grid>
    ) : null;
  }
);

const CommentsBox = memo<ICommentsBox>(({ date, title, message, isNew }) => {
  return (
    <Grid sx={notificationBoxSX(isNew || false)} className="comment-box">
      <Grid className="content">
        <Typography className="title">{title} </Typography>
        <Typography className="message">{message}</Typography>
        <Grid className="time-container">
          <CustomIcon
            width={14}
            height={14}
            src={clockICON(COLOR_MUTED_TEXT)}
          />
          <Typography className="time-text">{date}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
});

const notificationPaperSX: SxProps<Theme> = {
  height: "auto",
  width: "350px",
  maxWidth: "350px",
  zIndex: "300000",
  "& .container-notification-popper": {
    maxHeight: "610px",
    overflowY: "auto",
    "& .header-notification-popper": {
      gap: SPACE_SM,
      display: "flex",
      px: SPACE_LG,
      py: "12px",
      backgroundColor: COLOR_DARK_BACKGROUND_SURFACE,
      alignItems: "center",
      "& .title-notification-popper": {
        fontSize: "16px",
        fontWeight: "600",
        color: COLOR_PRIMARY_TEXT,
      },
      "& .badge-notification-popper": {
        width: "20px",
        height: "20px",
        display: "flex",
        color: COLOR_WHITE,
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "500",
        backgroundColor: COLOR_YELLOW,
      },
    },
    "& .tab-wrapper-popper": {
      mt: "12px",
      "& .local-tab": {
        "& .tab-items-box": {
          height: "50px",
          "& .MuiTabs-flexContainer": {
            gap: SPACE_SM,
          },
        },
        "& .MuiTabPanel-root": {
          height: "100%",
          "& .wrapper-boxes": {
            overflowY: "auto",
            minHeight: "180px",
            maxHeight: "450px",
            animation: "fadeIn 0.6s",
          },
        },
      },
    },
  },
};

const notificationBoxContainersSX: SxProps<Theme> = {
  "&.tab-content-comment": {
    width: "100%",
    p: SPACE_LG,
    pt: 0,
    "& .title-comment": {
      mt: SPACE_SM,
      color: COLOR_PRIMARY_TEXT,
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
      textTransform: "capitalize",
    },
    "& .comments-wrapper": {
      display: "flex",
      rowGap: SPACE_SM,
      flexDirection: "column",
    },
  },
};

const notificationBoxSX = (isNewMessage: boolean): SxProps<Theme> => ({
  p: SPACE_MD,
  gap: SPACE_SM,
  width: "100%",
  height: "auto",
  display: "flex",
  backgroundColor: isNewMessage
    ? COLOR_DARK_BACKGROUND_SURFACE
    : COLOR_DARK_BACKGROUND,
  border: `1px solid ${COLOR_SURFACE}`,
  "& .content": {
    display: "flex",
    rowGap: SPACE_XS,
    flexDirection: "column",
    alignItems: "flex-start",
    "& .title": {
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
    },
    "& .message": {
      // ml: SPACE_SM,
      fontSize: FONT_SMALL_TEXT,
    },
    "& .time-container": {
      display: "flex",
      alignItems: "center",
      gap: SPACE_XS,
      "& .time-text": {
        color: COLOR_MUTED_TEXT,
        fontSize: "10px",
        fontWeight: "600",
      },
    },
  },
});
