import type { SxProps, Theme } from "@mui/material";

import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_SECONDARY_TEXT,
} from "../constants/colors";
import {
  SPACE_2XL,
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XL,
  SPACE_XS,
} from "../constants/spaces";
import { FONT_TITLE, FONT_WEIGHT_REGULAR } from "../constants/fonts";

export const headerPageSX: SxProps<Theme> = {
  p: SPACE_MD,
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  borderRadius: "12px",
  backgroundColor: COLOR_WHITE,
  justifyContent: "space-between",
  "& .title-wrapper": {
    display: "flex",
    flexDirection: "column",
    "& .title": {
      fontSize: FONT_TITLE,
      fontWeight: FONT_WEIGHT_REGULAR,
    },
  },
  "& .breadcrumb": {
    marginBottom: "50px !important",
  },
  "& .feature-box": {
    display: "flex",
    gap: SPACE_SM,
  },
};

export const seeAllNotifyButton = (scrollTop: boolean): SxProps<Theme> => ({
  pt: "20px",
  display: "flex",
  position: "sticky",
  justifyContent: "center",
  borderTop: "1px solid" + COLOR_BORDER,
  "& svg": {
    transition: "transform 0.5s",
    transform: scrollTop ? "rotate(180deg)" : undefined,
  },
});

export const ViewRequestSX: SxProps<Theme> = {
  "&.view-request-page": {
    "& .container": {
      backgroundColor: COLOR_WHITE,
      "& .detail-wrapper": {
        p: SPACE_LG,
        borderTop: `1px solid ${COLOR_BORDER}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        // mt: "12px",
        animation: "fadeIn 0.7s",
        // justifyContent: "space-between",
        gap: SPACE_LG,
        "& .requests": {
          display: "flex",
          flexWrap: "wrap",
          gap: SPACE_2XL,
          pb: SPACE_XL,
          pt: SPACE_MD,
          borderBottom: `1px solid ${COLOR_BORDER}`,
        },
        "& .form-data": {
          display: "flex",
          gap: SPACE_MD,
          flexWrap: "wrap",
          alignItems: "center",
          "& .item": {
            width: "160px",
          },
          "& .image-box-wrapper": {
            width: "100px",
            height: "100px",
          },
        },
      },
    },
    "& .comment-wrapper": {
      p: SPACE_LG,
      display: "flex",
      borderRadius: "16px",
      mt: "12px",
      animation: "fadeIn 0.7s",
      justifyContent: "space-between",
      alignItems: "center",
      "& .input-status-wrapper": {
        display: "flex",
        alignItems: "center",
        width: "60%",
        "& .MuiInputBase-root": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    "& .item": {
      gap: SPACE_SM,
      display: "flex",
      flexDirection: "column",
      "& .item-title": {
        display: "flex",
        gap: SPACE_XS,
        alignItems: "center",
        "& .title": {
          color: COLOR_SECONDARY_TEXT,
        },
        "& svg": {
          width: "20px",
        },
      },
      "& .item-text": {
        pl: SPACE_XL,
        fontWeight: "600",
        fontSize: "16px",
        textTransform: "capitalize",
        "& .status-box": {
          fontSize: "11px",
        },
      },
    },
  },
};
