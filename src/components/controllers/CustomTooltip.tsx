import {
  Box,
  Grid,
  Tooltip,
  type Theme,
  Typography,
  type SxProps,
  type TooltipProps,
} from "@mui/material";
import { memo, type JSX } from "react";

import { SPACE_XS } from "../../helpers/constants/spaces";
import { COLOR_PLACEHOLDER } from "../../helpers/constants/colors";
import { FONT_BODY, FONT_WEIGHT_REGULAR } from "../../helpers/constants/fonts";

type TCustomTooltip = {
  dir?: string;
  sx?: SxProps<Theme>;
  background?: string;
  title: string;
  icon?: JSX.Element | string;
  component?: JSX.Element | string;
  textAlign?: "start" | "center" | "end";
  placement?: TooltipProps["placement"];
};

export const CustomTooltip = memo<TCustomTooltip>(
  ({ textAlign, icon, title, placement, sx, component, background }) => {
    return (
      <Grid className="local-tooltip">
        <Tooltip
          title={<Typography className="title-tooltip">{title}</Typography>}
          arrow
          placement={placement ?? "bottom"}
          componentsProps={{
            tooltip: {
              sx: {
                ...localTooltipSX(textAlign, background),
                ...sx,
              } as SxProps,
            },
          }}
        >
          <Box className="icon-tooltip" sx={IconTooltipSX} component="div">
            {icon}
            {component && component}
          </Box>
        </Tooltip>
      </Grid>
    );
  }
);

const localTooltipSX = (
  textAlign?: string,
  background?: string
): SxProps<Theme> => ({
  height: "auto",
  display: "flex",
  maxWidth: "400px",
  lineHeight: "35px",
  alignItems: "center",
  justifyContent: "center",
  textAlign: textAlign ?? "start",
  borderRadius: "0",
  background: background ?? COLOR_PLACEHOLDER,
  "& span": {
    color: COLOR_PLACEHOLDER,
  },
  "& .title-tooltip": {
    wordBreak: "break-all",
    lineHeight: "32px",
    fontSize: FONT_BODY,
    fontWeight: FONT_WEIGHT_REGULAR,
  },
});

const IconTooltipSX: SxProps<Theme> = {
  px: SPACE_XS,
  display: "flex",
  minWidth: "20px",
  minHeight: "20px",
  cursor: "pointer",
  borderRadius: "50%",
  position: "relative",
  alignContent: "center",
  justifyContent: "center",
};
