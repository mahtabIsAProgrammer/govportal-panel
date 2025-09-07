import { isString } from "lodash";
import { useMemo, type FC } from "react";
import { Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { CustomTooltip } from "../controllers/CustomTooltip";
import { FONT_CAPTION } from "../../helpers/constants/fonts";
import { COLOR_PRIMARY_TEXT } from "../../helpers/constants/colors";
import { TEXT_TOOLTIP_LENGTH } from "../../helpers/constants/statics";

interface ITextTooltip {
  text: string;
  suffix?: string;
  length?: number;
  tooltipSX?: SxProps<Theme>;
  placement?: "top" | "right" | "bottom" | "left" | undefined;
}

export const TextTooltip: FC<ITextTooltip> = ({
  text,
  length,
  placement,
  suffix,
  tooltipSX,
}) => {
  const slicedText = useMemo(
    () =>
      isString(text)
        ? text?.slice(0, length || TEXT_TOOLTIP_LENGTH) + "..."
        : text,
    [length, text]
  );

  const truncatedText = useMemo(
    () => text.length > (length || TEXT_TOOLTIP_LENGTH),
    [length, text.length]
  );

  const component = useMemo(
    () => (
      <Typography
        sx={{
          color: COLOR_PRIMARY_TEXT,
          fontSize: FONT_CAPTION,
          fontWeight: "700",
          cursor: truncatedText ? "cursor" : "default ",
          wordBreak: "break-all",
        }}
        component="span"
        className="text-tooltip"
      >
        {(truncatedText ? slicedText : text) + (suffix || "")}
      </Typography>
    ),
    [slicedText, suffix, text, truncatedText]
  );

  return (
    <>
      {truncatedText ? (
        <Grid
          sx={{
            "& .icon-tooltip": {
              cursor: "pointer",
            },
          }}
        >
          <CustomTooltip
            sx={tooltipSX}
            title={text}
            placement={placement}
            component={component}
          />
        </Grid>
      ) : (
        component
      )}
    </>
  );
};
