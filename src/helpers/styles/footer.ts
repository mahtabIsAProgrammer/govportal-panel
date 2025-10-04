import type { SxProps, Theme } from "@mui/material";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
} from "../constants/colors";

export const footerSX: SxProps<Theme> = {
  py: "40px",
  mt: { xs: "22px", md: "50px" },
  px: { xs: "12px", md: "80px" },
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLOR_SECONDARY,
  "& .content-footer": {
    width: "100%",
    display: "flex",
    justifyContent: { xs: "center", md: "space-between" },
    gap: { xs: "20px", md: 0 },
    "& .social-content": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: { xs: "center", md: "unset" },
      rowGap: "20px",
      "& .logo": {
        width: "200px",
      },
      "& .description": {
        fontWeight: "400",
        lineHeight: "18px",
        color: COLOR_WHITE,
        fontSize: "16px",
        textAlign: { xs: "center", md: "unset" },
      },
      "& .socail-boxes": {
        width: "230px",
        display: "flex",
        "& .social-box": {
          m: "auto",
          width: "40px",
          height: "40px",
          display: "flex",
          cursor: "pointer",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLOR_PRIMARY,
          "&:hover": {
            "& svg": {
              transition: "all 0.4s",
              transform: "scale(1.2)",
            },
          },
        },
      },
    },
    "& .navigation-content": {
      gap: "14px",
      display: { xs: "none", md: "flex" },
      flexDirection: "column",

      "& .title": {
        lineHeight: "48px",
        fontWeight: "500",
        color: COLOR_WHITE,
        fontSize: { xs: "28px", md: "20px" },
      },
      "& .text": {
        cursor: "pointer",
        fontWeight: "400",
        transition: "all 0.4s",
        color: COLOR_WHITE,
        fontSize: "16px",
        "&:hover": {
          color: COLOR_PRIMARY,
        },
      },
    },

    "& .send-email-content": {
      "& .title": {
        mb: "25px",
        fontWeight: "600",
        color: COLOR_WHITE,
        fontSize: { xs: "28px", md: "18px" },
      },
      "& .email-input": {
        "& .MuiInputBase-root": {
          backgroundColor: COLOR_WHITE,
        },
      },
    },
  },
  "& .copyright-text": {
    mt: { xs: "18px", md: "40px" },
    pt: { xs: "12px", md: "40px" },
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
    borderTop: "1px solid" + COLOR_PRIMARY,
    alignItems: { xs: "center", md: "unset" },
    "& .text": {
      display: "flex",
      fontWeight: "600",
      gap: "4px",
      alignItems: "center",
      color: COLOR_WHITE,
      fontSize: { xs: "12px", md: "16px" },
      "& span": {
        color: COLOR_PRIMARY,
      },
      "& .icon": {
        height: "18px",
      },
    },
  },
};
