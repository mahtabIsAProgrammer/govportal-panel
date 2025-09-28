import type { SxProps, Theme } from "@mui/material";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY_TEXT,
  COLOR_SECONDARY_TEXT,
  COLOR_DARK_BACKGROUND,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_GRAY_LIGHT,
  COLOR_DARK_BACKGROUND_SURFACE,
} from "../constants/colors";
import { MAX_WIDTH_CITIZEN, NAVBAR_HEIGHT_SIZE } from "../constants/statics";
import { FONT_CAPTION, FONT_SMALL_TEXT } from "../constants/fonts";
import { SPACE_MD, SPACE_SM, SPACE_XS } from "../constants/spaces";

export const navbarSX = (theme: TTheme): SxProps<Theme> => ({
  px: SPACE_MD,
  width: "100%",
  gap: SPACE_MD,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: NAVBAR_HEIGHT_SIZE,
  backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_DARK_BACKGROUND,
  "& .notif-icon": {
    cursor: "pointer",
    mt: "6px",
    "&:hover": {
      scale: "1.2",
      transition: "0.4s",
    },
  },
});

export const languageitemsSX: SxProps<Theme> = {
  width: "180px",
  padding: SPACE_SM,
  backgroundColor: COLOR_WHITE,
  borderRadius: "0",
  boxShadow:
    "-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",

  "& .select-item": {
    display: "flex",
    gap: SPACE_SM,
    borderRadius: "0",
    "& .flag-img": {
      width: "28px",
      height: "20px",
      "& svg": {
        borderRadius: "0",
      },
    },
  },
  "& .text": {
    fontSize: FONT_CAPTION,
    fontWeight: "500",
    marginY: SPACE_XS,
  },
};

export const userInfoSX: SxProps<Theme> = {
  width: "200px",
  // backgroundColor: COLOR_WHITE,
  borderRadius: "0",
  // boxShadow:
  //   "-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)",
  display: "flex",
  flexDirection: "column",
  "& .info": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    p: `${SPACE_MD} ${SPACE_MD} ${"12px"}`,
    borderBottom: "1px solid" + COLOR_BORDER,
    "& .name": {
      fontWeight: "400",
      fontSize: FONT_SMALL_TEXT,
      color: COLOR_PRIMARY_TEXT,
    },
    "& .email": {
      fontSize: FONT_CAPTION,
      color: COLOR_SECONDARY_TEXT,
    },
  },
  "& .action-items": {
    gap: SPACE_XS,
    display: "flex",
    padding: SPACE_SM,
    flexDirection: "column",
    borderBottom: "1px solid" + COLOR_BORDER,
    "& .item": {
      cursor: "pointer",
      overflowX: "clip",
      whiteSpace: "normal",
      height: "fit-content",
      p: "6px 8px",
      alignItems: "center",
      display: "flex",
      gap: SPACE_SM,
      borderRadius: "0",
      wordBreak: "break-word",
      minHeight: "fit-content",
      "& p": {
        fontSize: FONT_SMALL_TEXT,
        color: COLOR_PRIMARY_TEXT,
      },
      "&:hover": {
        backgroundColor: COLOR_GRAY_LIGHT + "10",
      },
    },
  },
  "& .log-out": {
    width: "100%",
    p: SPACE_SM,
  },
  "& .text": {
    fontWeight: "500",
    marginY: SPACE_XS,
    fontSize: FONT_CAPTION,
  },
};

export const navbarCitizenX = (
  openCategoryPopper?: boolean
): SxProps<Theme> => ({
  mx: "auto",
  px: SPACE_MD,
  py: "12px",
  top: "40px",
  zIndex: 1200,
  display: "flex",
  position: "fixed",
  borderRadius: "0",
  alignItems: "center",
  animation: "fadeIn 1s",
  width: MAX_WIDTH_CITIZEN,
  justifyContent: "space-between",
  backgroundColor: COLOR_DARK_BACKGROUND_SURFACE,
  borderBottomRightRadius: openCategoryPopper ? "0" : undefined,
  // boxShadow: `-20px 20px 40px -4px ${COLOR_GRAY_LIGHT}30, 0px 0px 2px 0px ${COLOR_GRAY_LIGHT}30`,
  "& .logo-wrapper": {
    "& .logo": {
      width: "120px",
      height: "30px",
    },
  },
  "& .nav-list-wrapper": {
    gap: "40px",
    display: { xs: "none", md: "flex" },
    "& .navbar-value-name": {
      zIndex: "20",
      cursor: "pointer",
      position: "relative",
      fontSize: FONT_SMALL_TEXT,
      fontWeight: "600",
      "&.active": {
        "&:before": {
          transform: " scaleX(1)",
          transformOrigin: "bottom left",
        },
      },
      "&:hover ": {
        "&:before": {
          transform: " scaleX(1)",
          transformOrigin: "bottom left",
        },
      },
      "&:before": {
        content: "''",
        width: "100%",
        height: "2px",
        display: "block",
        position: "absolute",
        right: 0,
        bottom: "-4px",
        zIndex: "-1",
        transform: " scaleX(0)",
        background: COLOR_PRIMARY,
        transition: "transform .3s ease",
        transformOrigin: "bottom right",
      },
    },
  },
  "& .actions-wrapper": {
    gap: { xs: "14px", md: SPACE_SM },
    display: "flex",
    position: "relative",
    alignItems: "center",
    "& .notif-icon": {
      mt: "6px",
      cursor: "pointer",
      "&:hover": {
        scale: "1.2",
        transition: "0.4s",
      },
    },
    "& .icon-navbar": {
      zIndex: "33",
      cursor: "pointer",
      position: "relative",
      transition: "transform 0.4s",
      "&:hover": {
        transform: "scale(1.2)",
      },
      "& span": {
        top: "-4px",
        right: "-4px",
        width: "14px",
        height: "14px",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        color: COLOR_SECONDARY,
        background: COLOR_WHITE,
        justifyContent: "center",
        fontSize: FONT_CAPTION,
      },
    },
  },
  "& .mobile-menu-icon": {
    display: { xs: "block", md: "none" }, // 👈 Show only on small screens
    cursor: "pointer",
  },
});

export const drawerSX: SxProps<Theme> = {
  width: 250,
  "& .MuiDrawer-paper": {
    width: 250,
    backgroundColor: COLOR_PRIMARY,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    zIndex: 33,
  },
};
