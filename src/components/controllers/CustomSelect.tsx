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
import { memo, useContext } from "react";

import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_BORDER,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_DARK_BACKGROUND,
} from "../../helpers/constants/colors";
import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";
import { MainContext } from "../../helpers/others/mainContext";
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
};

export const CustomSelect = memo<ICustomSelect>(
  ({ errorMessage, className, customLabel, ...props }) => {
    const { required, items, disabled, label, name } = props;
    const { theme } = useContext(MainContext);
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
            {...{
              ...props,
              className: className + " custom-select",
              labelId: name + "select-label",
              required: undefined,
            }}
            MenuProps={{
              sx: listMuiSelectSX(theme),
            }}
            displayEmpty
          >
            {items?.map(({ value, label }, key) => (
              <MenuItem
                key={key}
                sx={localSelectItemsSX(theme)}
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

const localSelectSX = (disabled: boolean | undefined): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  pb: SPACE_MD,
  "& .local-select": {
    width: "100%",
    borderRadius: "12px",
    color: COLOR_PRIMARY_TEXT,
    padding: "0px !important",
    opacity: disabled ? 0.4 : 1,
  },
  "& .MuiOutlinedInput-input": {
    px: `${SPACE_SM} !important`,
  },
  "& .MuiInputBase-root": {
    outline: "none",
    color: COLOR_PRIMARY_TEXT,
    fontSize: FONT_SMALL_TEXT,
    borderRadius: "12px",
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
    fontWeight: FONT_WEIGHT_BLOD,
    fontSize: FONT_SMALL_TEXT,
    display: "flex",
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

const localSelectItemsSX = (theme: TTheme): SxProps<Theme> => ({
  display: "flex",
  alignItems: "stretch",
  flexDirection: "column",
  textAlign: "right",
  fontWeight: FONT_WEIGHT_BLOD,
  fontSize: FONT_SMALL_TEXT,
  background: theme == "light" ? COLOR_WHITE : COLOR_BLACK,
  justifyContent: "flex-start",
  mb: SPACE_XS,
  gap: "100px",
  width: "97% !important",
  borderRadius: "8px",
  "& .select-item": {
    height: "35px",
    fontWeight: FONT_WEIGHT_BLOD,
    fontSize: FONT_SMALL_TEXT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .sub-label": {
    fontWeight: FONT_WEIGHT_BLOD,
    fontSize: FONT_SMALL_TEXT,
    color: `${COLOR_PRIMARY_TEXT}80`,
  },
  "&:hover": {
    background: `${"#919EAB"}20`,
  },

  "& .MuiInputBase-root": {
    outline: "none",
    borderRadius: "12px",
    border: `1px solid ${COLOR_PRIMARY_TEXT}70`,
    "& .MuiTouchRipple-root": {
      backgroundColor: `${COLOR_PRIMARY}10 !important`,
    },
  },
});

const listMuiSelectSX = (theme: TTheme): SxProps<Theme> => ({
  "& .MuiMenu-paper": {
    background: theme == "light" ? COLOR_WHITE : COLOR_DARK_BACKGROUND,
    my: `${SPACE_SM} !important`,
    borderRadius: `14px`,
    boxShadow:
      theme == "light"
        ? "0px 0px 7px 3px rgba(230,230,230,0.5) !important"
        : "",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      my: SPACE_MD,
      borderRadius: "14px",
      background: "#0000000A",
    },
    "&::-webkit-scrollbar-thumb": {
      background: COLOR_PRIMARY,
      borderRadius: "14px",
    },
  },
  "& .MuiList-root": {
    maxHeight: "190px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiMenuItem-root": {
    justifyContent: "center !important",
  },
});
