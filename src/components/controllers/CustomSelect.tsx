import {
  Grid,
  Select,
  MenuItem,
  type Theme,
  Typography,
  InputLabel,
  FormControl,
  type SxProps,
  type SelectProps,
} from "@mui/material";
import { memo, useMemo } from "react";

import {
  FONT_CAPTION,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import {
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_GRAY_LIGHT,
} from "../../helpers/constants/colors";
import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";
import { SPACE_MD, SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";

export type ICustomSelect = SelectProps & {
  customLabel?: string;
  lng?: string;
  subTitleLabel?: string;
  className?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  items?: IOption[];
  errorMessage?: IErrorMessage;
  menuItemSX?: SxProps;
  menuPaperSX?: SxProps;
};

export const CustomSelect = memo<ICustomSelect>(
  ({
    errorMessage,
    className,
    customLabel,
    menuItemSX,
    menuPaperSX,
    ...props
  }) => {
    const { required, items, disabled, label, name } = props;

    const menuPropsManageThemeSX = useMemo(
      () => ({ ...(menuPaperSX || {}) }),
      [menuPaperSX]
    );
    const menuItemSelectManageThemeSX = useMemo(
      () => ({ ...localSelectItemsSX, ...(menuItemSX || {}) }),
      [menuItemSX]
    );

    return (
      <Grid sx={localSelectSX(disabled)} className="wrapper-custom-select">
        {customLabel ? (
          <CustomLabel
            disabled={disabled}
            customLabel={customLabel}
            required={required}
          />
        ) : undefined}
        <FormControl>
          {label && <InputLabel id={name + "select-label"}>{label}</InputLabel>}
          <Select
            MenuProps={{
              disablePortal: true,
              sx: menuPropsManageThemeSX as SxProps<Theme>,
            }}
            {...{
              ...props,
              className: className + " custom-select",
              labelId: name + "select-label",
              required: undefined,
            }}
            displayEmpty
          >
            {items?.map(({ value, label }, key) => (
              <MenuItem
                key={key}
                sx={menuItemSelectManageThemeSX}
                className="select-items"
                value={value}
              >
                <Typography variant="body1" className="select-item">
                  {label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errorMessage && (
          <ErrorMessage
            text={errorMessage?.text || ""}
            type={errorMessage?.type || "error"}
            disabled={disabled || false}
          />
        )}
      </Grid>
    );
  }
);

const localSelectItemsSX: SxProps<Theme> = {
  mb: SPACE_XS,
  py: "6px",
  px: SPACE_MD,
  display: "flex",
  textAlign: "right",
  alignItems: "stretch",
  width: "95% !important",
  background: COLOR_WHITE,
  flexDirection: "column",
  fontSize: FONT_CAPTION,
  justifyContent: "flex-start",
  fontWeight: "700",
  borderRadius: "0",
  "&.MuiMenuItem-root": {
    overflowX: "clip",
    whiteSpace: "normal",
    height: "fit-content",
    width: "95% !important",
    wordBreak: "break-word",
    minHeight: "fit-content",
    "&:hover": {
      backgroundColor: COLOR_GRAY_LIGHT + "10",
    },
  },
  "& .sub-label": {
    color: `${COLOR_PRIMARY_TEXT}80`,
    fontSize: FONT_CAPTION,
    fontWeight: "700",
  },
  "&.Mui-selected": {
    backgroundColor: `${COLOR_PRIMARY}20 !important`,
  },
};

const localSelectSX = (disabled: boolean | undefined): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  pb: SPACE_MD,
  "& .local-select": {
    width: "100%",
    borderRadius: "0",
    color: COLOR_PRIMARY_TEXT,
    padding: "0px !important",
    opacity: disabled ? 0.4 : 1,
  },
  "& .MuiOutlinedInput-input": {
    px: `${"14px"} !important`,
  },
  "& .MuiInputBase-root": {
    outline: "none",
    color: COLOR_PRIMARY_TEXT,
    fontSize: FONT_SMALL_TEXT,
    borderRadius: "0",
    borderColor: COLOR_BORDER,
    fontWeight: FONT_WEIGHT_MEDUIM,
    "& fieldset": {
      borderColor: COLOR_BORDER,
    },
    "&.Mui-focused": {
      backgroundColor: `${COLOR_PRIMARY}10 !important`,
    },
    "&:hover fieldset": {
      borderColor: disabled ? "none" : COLOR_PRIMARY,
    },
    "&::placeholder": {
      color: `${"#919EAB"} !important`,
    },
  },
  "& .MuiSvgIcon-root": {
    display: "flex",
    position: "relative",
    right: "12px",
    top: "0px",
    cursor: "pointer",
  },
  "& .select-item": {
    fontWeight: "600",
    fontSize: FONT_SMALL_TEXT,
    display: "flex",
    textTransform: "capitalize",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .MuiInputLabel-root": {
    left: "22px",
    transformOrigin: "top left",
    fontSize: "14px",
    fontWeight: "600",
    px: SPACE_SM,
  },
  "& legend": {
    textAlign: "end !important",
  },
});
