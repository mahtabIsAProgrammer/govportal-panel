import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XL,
  SPACE_XS,
  SPACE_2XL,
} from "../constants/spaces";
import { COLOR_BORDER, COLOR_WHITE } from "../constants/colors";

export const pageProviderSX: SxProps<Theme> = {
  "& .progress-box-wrapper": {
    alignItems: "center",
    "& .progress-box-item": {
      px: SPACE_XS,
      py: SPACE_XS,
    },
  },
};

export const tableProviderSX: SxProps<Theme> = {
  p: SPACE_LG,
  display: "flex",
  borderRadius: "16px",
  mt: "12px",
  animation: "fadeIn 0.7s",
  backgroundColor: COLOR_WHITE,
  justifyContent: "space-between",
  "& .table-content": {
    width: "100%",
    "& .table-filter-wrapper": {
      px: SPACE_SM,
      justifyContent: "space-between",
      "& .table-filter-item ": {
        px: undefined,
      },
      "& .table-filter": {
        px: undefined,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "& .fields-wrapper": { width: "32%" },
        "& .extra-buttons": {
          display: "flex",
          justifyContent: "flex-end",
          gap: SPACE_MD,
          pb: SPACE_2XL,
        },
      },
    },
  },
};

export const formButtonsSX: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: SPACE_SM,
  position: "sticky",
  bottom: "-40px",
  background: COLOR_WHITE,
  p: SPACE_XL,
  borderRadius: "14px",
  boxShadow: `-20px 20px 40px -4px ${"#A3A3A3"}30, 0px 0px 2px 0px ${"#A3A3A3"}`,
  zIndex: "1001",
  mt: SPACE_XL,
  border: "none",
};

export const addEditProviderSX: SxProps<Theme> = {
  position: "relative",
  "& .header-page-content": {
    width: "100%",
  },
  "& .custom-component": {
    py: SPACE_MD,
  },
  "& .content-page": {
    width: "100%",
    gap: SPACE_XL,

    "& .inputs-box": {
      p: SPACE_XL,
      height: "max-content",
      background: COLOR_WHITE,
      borderRadius: "14px",
      boxShadow: "none",
      border: `1px solid ${COLOR_BORDER}`,
      "&.px-box": {
        p: SPACE_XL,
      },
    },
    "& .inputs-box-tab": {
      pb: SPACE_XL,
      width: "100%",
    },
    "& .input-box-split-divider": {
      gap: "36px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      "& .input-box-wrapper-main-divider": {
        p: SPACE_XL,
        borderRadius: "14px",
        backgroundColor: COLOR_WHITE,
        boxShadow: `-20px 20px 40px -4px ${"#A3A3A3"}30, 0px 0px 2px 0px ${"#A3A3A3"}30`,
      },
    },
  },
};
