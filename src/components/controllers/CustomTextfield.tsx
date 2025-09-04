import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  type Theme,
  type SxProps,
  InputAdornment,
  type TextFieldProps,
  type TextFieldVariants,
} from "@mui/material";
import { memo, useCallback, useState, type FC, type ReactElement } from "react";

import {
  eyeIcon,
  errorIcon,
  dollarIcon,
  warningIcon,
  eyeSlashIcon,
} from "../other/FunctionalSVG";
import {
  COLOR_PRIMARY_TEXT,
  COLOR_BORDER,
  COLOR_PRIMARY,
} from "../../helpers/constants/colors";
import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import { CustomLabel } from "./CustomLabel";
import { SPACE_SM, SPACE_MD } from "../../helpers/constants/spaces";
import { ERROR_MESSAGE_STYLE } from "../../helpers/constants/materials";

export type TCustomTextfield =
  | {
      customLabel?: string;
      required?: boolean;
      variant?: TextFieldVariants;
      errorMessage?: IErrorMessage;
      disabled?: boolean;
      icon?: ReactElement;
      isTextarea?: boolean;
      isPrice?: boolean;
      isAutocomplete?: boolean;
    } & Omit<TextFieldProps, "variant"> & {};

export const CustomTextfield = memo<TCustomTextfield>(
  ({
    errorMessage,
    customLabel,
    className,
    required,
    disabled,
    type,
    isPrice,
    icon,
    isTextarea,
    isAutocomplete,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordVisibility = useCallback(() => {
      setShowPassword((prevState) => !prevState);
    }, []);

    return (
      <Grid container className="textfield-wrapper" sx={textfieldSX(disabled)}>
        <Grid className="label-box" sx={{ display: "flex", gap: SPACE_SM }}>
          {customLabel ? (
            <CustomLabel customLabel={customLabel} required={required} />
          ) : undefined}
        </Grid>
        <TextField
          rows={isTextarea ? 5 : 0}
          multiline={isTextarea}
          type={
            type !== "password" || showPassword
              ? isPrice
                ? "number"
                : "text"
              : "password"
          }
          slotProps={
            isAutocomplete
              ? {}
              : {
                  input: {
                    endAdornment: (icon || type == "password" || isPrice) && (
                      <InputAdornment position="end">
                        {icon && <IconButton>{icon}</IconButton>}
                        {isPrice && <IconButton>{dollarIcon()}</IconButton>}
                        {type == "password" && (
                          <IconButton
                            disabled={disabled}
                            onClick={handlePasswordVisibility}
                          >
                            {showPassword ? eyeIcon() : eyeSlashIcon()}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                }
          }
          {...props}
          required={undefined}
          className={className && "custom-textfield"}
        />
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

export const ErrorMessage: FC<IErrorMessage> = ({ text, type, disabled }) => {
  return (
    <Box
      component="div"
      sx={ERROR_MESSAGE_STYLE(disabled)}
      className="error-message"
    >
      {text && type === "warning"
        ? warningIcon()
        : text && type === "error"
        ? errorIcon()
        : ""}
      <Typography variant="body1" className="text-icon">
        {text}
      </Typography>
    </Box>
  );
};

const textfieldSX = (
  disabled: TCustomTextfield["disabled"]
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  pb: SPACE_MD,
  flexDirection: "column",
  opacity: disabled ? 0.4 : 1,
  "& .custom-textfield": {
    width: "100%",
    borderRadius: "12px",
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
  },
  "& .icon-search": {
    cursor: "pointer",
  },
  "& .MuiTextField-root": {
    "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
      "&::after": {
        content: '"mandatory field"',
      },
    },
    "& .MuiInputLabel-root": {
      left: "0px",
    },
    "& legend": {
      textAlign: "left",
    },
  },
  "& .MuiIconButton-root": {
    padding: "0px !important",
  },
  "& .MuiInputBase-input": {
    color: `${COLOR_PRIMARY_TEXT} !important`,
    fontSize: `${FONT_SMALL_TEXT} !important`,
    fontWeight: `${FONT_WEIGHT_MEDUIM} !important`,
    pl: "14px",
    "::placeholder": {
      color: "#919EAB",
    },
  },

  "& .MuiInputLabel-root": {
    left: "0px",
    transformOrigin: "top left",
  },
  "& legend": {
    textAlign: "left",
  },
  "& .delete-icon-button": {
    "&:hover": {
      background: "transparent !important",
    },
  },
});
