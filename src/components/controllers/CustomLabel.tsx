import { memo } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { CustomTooltip } from "./CustomTooltip";
import { hintICON } from "../other/FunctionalSVG";
import { FONT_BUTTON } from "../../helpers/constants/fonts";
import { COLOR_PRIMARY_TEXT } from "../../helpers/constants/colors";
import { SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";

export const CustomLabel = memo<ICustomLabel>(
  ({
    //   subTitleLabel,
    customLabel,
    tooltip,
    ...props
  }) => {
    const { required, gap, disabled } = props;

    return (
      <Grid container gap={gap}>
        <Grid className="label-box" sx={{ display: "flex", gap: SPACE_SM }}>
          {customLabel && (
            <Typography
              variant="body1"
              className="label-local-text-field"
              sx={STYLE_LABEL(disabled)}
            >
              {customLabel}
              {tooltip && (
                <CustomTooltip
                  title={tooltip?.text ?? ""}
                  placement={tooltip?.placement}
                  icon={hintICON()}
                />
              )}
              {required && (
                <Box
                  component="span"
                  className="required-icon"
                  sx={STYLE_REQUIRED_ICON(disabled)}
                >
                  *
                </Box>
              )}
            </Typography>
          )}
        </Grid>
        {/* {subTitleLabel && (
        <Typography variant="h1" sx={STYLE_SUBTITLE_LABEL(dir, disabled)}>
          {subTitleLabel}
        </Typography>
      )} */}
      </Grid>
    );
  }
);

const STYLE_LABEL = (disabled?: boolean): SxProps<Theme> => ({
  display: "flex",
  color: COLOR_PRIMARY_TEXT,
  fontSize: FONT_BUTTON,
  marginBottom: SPACE_SM,
  fontWeight: "600",
  textTransform: "capitalize",
  flexDirection: "row",
  opacity: disabled ? 0.4 : 1,
});

const STYLE_REQUIRED_ICON = (disabled?: boolean): SxProps<Theme> => ({
  color: "red",
  px: SPACE_XS,
  opacity: disabled ? 0.4 : 1,
});
