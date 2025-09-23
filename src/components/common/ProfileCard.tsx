import { type FC, type JSX, type ReactNode } from "react";
import { type SxProps, Grid, type Theme, Box, Typography } from "@mui/material";
import { FONT_CAPTION, FONT_SMALL_TEXT } from "../../helpers/constants/fonts";
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
} from "../../helpers/constants/colors";
import { SPACE_SM } from "../../helpers/constants/spaces";

import { filter, isArray, isString, map } from "lodash";
import { arrayToStringHnadler } from "../../helpers/utils/array";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";
import { urlImageHandler } from "../../helpers/utils/images";
import { EmptyValue, emptyValueString } from "../other/EmptyComponents";
import { checkUndefiendOrNull } from "../../helpers/utils/values";

interface IImageListBox {
  src?: JSX.Element | string | null;
  variant?: TImageVariant;
}

interface IProfileCard {
  title?: {
    text: string | null | undefined | (string | null | undefined)[];
    onClick?: TEmptyVoidFunction;
  };
  subtitle?: string | string[] | JSX.Element | null;
  image?: IImageListBox;
  icon?: { elm: JSX.Element | undefined; color: string | undefined };
  onClickHandler?: TEmptyVoidFunction;
  subtitleIcon?: ReactNode;
  badge?: {
    color: string;
    text: string;
  };
}

export const ProfileCard: FC<IProfileCard> = ({
  badge,
  icon,
  image,
  onClickHandler,
  subtitle,
  subtitleIcon,
  title,
}) => {
  const { onClick, text } = title ?? {};
  const onClickText = onClick ? true : false;

  const finalSubtitle: string | undefined =
    subtitle && isArray(subtitle)
      ? subtitle?.length > 0
        ? (arrayToStringHnadler(
            filter(
              subtitle?.map((value: string) => value || undefined),
              Boolean
            ) as string[],
            " "
          ) as string)
        : undefined
      : isString(subtitle)
      ? subtitle || undefined
      : undefined;
  return (
    <Grid
      onClick={onClickHandler}
      sx={profileCardSX(
        onClickText,
        image?.variant,
        icon?.color,
        false,
        badge?.color
      )}
      className="profile-card"
    >
      <Grid className="image-wrapper">
        {!icon ? (
          <CustomImageBox
            variant={image?.variant || "rounded"}
            src={urlImageHandler(image?.src, image?.variant === "circular")}
            className="profile-image"
          />
        ) : (
          <CustomIcon src={icon?.elm} className="icon-profile-card" />
        )}
      </Grid>
      <Box component="div" className="profile-texts-container">
        <Box component="div" onClick={onClick} className="profile-title">
          {text && isArray(text) ? (
            text.length > 0 ? (
              arrayToStringHnadler(
                map(
                  text,
                  (value) => value || emptyValueString
                ) as unknown as string[],
                " "
              )
            ) : (
              <EmptyValue />
            )
          ) : checkUndefiendOrNull(text) ? (
            <EmptyValue />
          ) : (
            text
          )}
        </Box>
        {isString(subtitle) ? (
          <Box className="profile-subtitle">
            {subtitleIcon ? (
              <CustomIcon
                src={subtitleIcon as ReactNode}
                className="icon-subtitle"
              />
            ) : null}
            <Typography className="profile-subtitle-text">
              {finalSubtitle ?? <EmptyValue />}
            </Typography>
          </Box>
        ) : checkUndefiendOrNull(subtitle) ? null : (
          subtitle
        )}
      </Box>
      {badge ? (
        <Grid className="badge">
          <Typography className="badge-text">{badge?.text}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};

const profileCardSX = (
  onClickText?: boolean,
  variant?: "circular" | "rounded" | undefined,
  color?: string,
  isLoaded?: boolean,
  colorBadge?: string
): SxProps<Theme> => ({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  justifyContent: "start",
  "& .profile-image": {
    width: "45px",
    height: "45px",
    cursor: "pointer",
  },
  // "& .skeleton-local-image": {
  //   animation: "fadeInFifty 0.9s , fadeOutFifty 0.9s",
  // },
  "& .profile-texts-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: SPACE_SM,
    "& .profile-title": {
      color: onClickText ? COLOR_PRIMARY : COLOR_PRIMARY_TEXT,
      textAlign: "start",
      cursor: onClickText ? "pointer !important" : "default",
      display: "flex",
      transition: "0.3s",
      // "&p": {
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "500",
      // },/
      "&:hover": {
        // "& p": {
        textDecoration: onClickText ? "underline" : "none",
        // },
      },
    },
    "& .empty-text": {
      cursor: "default",
      "&:hover": {
        textDecoration: "none !important",
      },
    },
    "& .profile-subtitle": {
      display: "flex",
      gap: SPACE_SM,
      alignItems: "center",
      "& .profile-subtitle-text": {
        fontSize: FONT_SMALL_TEXT,
        fontWeight: "500",
        color: "#A0A0A0",
        textAlign: "start",
      },
      "& .icon-subtitle": {},
    },
    "& .badge": {
      px: "30px",
      display: "flex",
      alignItems: "center",
      borderRadius: "16px",
      background: colorBadge + "30",
      "& p": {
        color: colorBadge,
        fontSize: FONT_CAPTION,
        fontWeight: "600",
      },
    },
  },

  "& .LocalAvatar": {
    border:
      variant == "rounded" ? "none !important" : `6px solid #ebf2ff !important`,
    display: isLoaded ? "block" : "none",
  },
  // "& .local-icon": {},
  "& .empty-text": {
    textDecoration: "none !important",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
  "& .icon-profile-card": {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: `${color}40`,
  },
});
