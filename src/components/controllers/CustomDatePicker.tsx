import {
  DatePicker,
  TimePicker,
  type TimePickerProps,
  DateTimePicker,
  type DatePickerProps,
  type DateTimePickerProps,
  renderTimeViewClock,
  DatePickerToolbar,
} from "@mui/x-date-pickers";
import { memo, useCallback } from "react";
import { Grid, type SxProps, type Theme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";
import { SPACE_MD } from "../../helpers/constants/spaces";
import { FONT_BODY } from "../../helpers/constants/fonts";
import { COLOR_RED } from "../../helpers/constants/colors";


export interface ICustomDatePicker
  extends DatePickerProps<TAny>,
    IStaticControllerProps {
  customHelperText?: string;
}
export interface ICustomDateTimePicker
  extends DateTimePickerProps<TAny>,
    IStaticControllerProps {
  customHelperText?: string;
}
export interface ICustomTimePicker
  extends TimePickerProps<TAny>,
    React.RefAttributes<HTMLDivElement>,
    IStaticControllerProps {
  name?: string;
  customHelperText?: string;
}

export const CustomDatePickerEnglish = memo<ICustomDatePicker>((props) => {
  const {
    // tooltip,
    required,
    disabled,
    customLabel,
    errorMessage,
    customHelperText,
  } = props;

  const helperText = useCallback(
    () =>
      customHelperText && (
        <ErrorMessage text={customHelperText} type="helperText" />
      ),
    [customHelperText]
  );

  const isErrorMessage = errorMessage ? true : false;

  return (
    <Grid
      sx={datePickerSX(disabled || false, isErrorMessage)}
      className="date-picker-english"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {customLabel ? (
          <CustomLabel
            customLabel={customLabel}
            required={required}
            // tooltip={tooltip}
          />
        ) : undefined}
        <DatePickerToolbar {...props} />
      </LocalizationProvider>
      {errorMessage ? (
        <ErrorMessage
          disabled={disabled}
          text={errorMessage?.text}
          type={errorMessage?.type}
        />
      ) : (
        helperText()
      )}
    </Grid>
  );
});

export const CustomDatePickerPersian = memo<ICustomDatePicker>((props) => {
  const {
    // tooltip,
    required,
    disabled,
    customLabel,
    errorMessage,
    customHelperText,
  } = props;

  const helperText = useCallback(
    () =>
      customHelperText && (
        <ErrorMessage text={customHelperText} type="helperText" />
      ),
    [customHelperText]
  );

  const isErrorMessage = errorMessage ? true : false;

  return (
    <Grid
      sx={datePickerSX(disabled || false, isErrorMessage)}
      className="date-picker-persian"
    >
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        {customLabel ? (
          <CustomLabel
            customLabel={customLabel}
            required={required}
            // tooltip={tooltip}
          />
        ) : undefined}
        <DatePicker {...props} />
      </LocalizationProvider>
      {errorMessage ? (
        <ErrorMessage
          disabled={disabled}
          text={errorMessage?.text}
          type={errorMessage?.type}
        />
      ) : (
        helperText()
      )}
    </Grid>
  );
});

//English date Time picker
export const CustomDateTimePickerEnglish = memo<ICustomDateTimePicker>(
  (props) => {
    const {
      // tooltip,
      required,
      disabled,
      customLabel,
      customHelperText,
      errorMessage,
    } = props;

    const isErrorMessage = errorMessage ? true : false;

    const helperText = useCallback(
      () =>
        customHelperText && (
          <ErrorMessage text={customHelperText} type="helperText" />
        ),
      [customHelperText]
    );

    return (
      <Grid
        sx={datePickerSX(disabled || false, isErrorMessage)}
        className="date-time-picker-english"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {customLabel ? (
            <CustomLabel
              customLabel={customLabel}
              required={required}
              //              tooltip={tooltip}
            />
          ) : undefined}
          <DateTimePicker orientation="landscape" {...props} ampm={false} />
        </LocalizationProvider>
        {errorMessage ? (
          <ErrorMessage
            disabled={disabled}
            text={errorMessage?.text}
            type={errorMessage?.type}
          />
        ) : (
          helperText()
        )}
      </Grid>
    );
  }
);

//Persian date Time picker

export const CustomDateTimePickerPersian = memo<ICustomDateTimePicker>(
  (props) => {
    const {
      // tooltip,
      required,
      disabled,
      customLabel,
      errorMessage,
      customHelperText,
    } = props;

    const isErrorMessage = errorMessage ? true : false;

    const helperText = useCallback(
      () =>
        customHelperText && (
          <ErrorMessage text={customHelperText} type="helperText" />
        ),
      [customHelperText]
    );

    return (
      <Grid
        sx={datePickerSX(disabled || false, isErrorMessage)}
        className="date-time-picker-persian"
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFnsJalali}
          localeText={{
            cancelButtonLabel: "cancel",
            clearButtonLabel: "erase",
            okButtonLabel: "record",
            todayButtonLabel: "today",
          }}
        >
          {customLabel ? (
            <CustomLabel
              customLabel={customLabel}
              required={required}
              // tooltip={tooltip}
            />
          ) : undefined}
          <DateTimePicker
            //format={(date: TAnyObjects) => (date ? date.format("jYYYY/jMM/jDD") : "")}
            {...props}
            ampm={false}
          />
        </LocalizationProvider>
        {errorMessage ? (
          <ErrorMessage
            disabled={disabled}
            text={errorMessage?.text}
            type={errorMessage?.type}
          />
        ) : (
          helperText()
        )}
      </Grid>
    );
  }
);

// Time Picker

export const CustomTimePicker = memo<ICustomTimePicker>(
  ({
    // tooltip,
    required,
    disabled,
    customHelperText,
    customLabel,
    errorMessage,
    ...props
  }) => {
    const isErrorMessage = errorMessage ? true : false;

    const helperText = useCallback(
      () =>
        customHelperText && (
          <ErrorMessage text={customHelperText} type="helperText" />
        ),
      [customHelperText]
    );

    return (
      <Grid
        sx={datePickerSX(disabled || false, isErrorMessage)}
        className="time-picker"
      >
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          localeText={{
            cancelButtonLabel: "cancel",
            clearButtonLabel: "erase",
            okButtonLabel: "record",
            todayButtonLabel: "today",
          }}
        >
          {customLabel ? (
            <CustomLabel
              customLabel={customLabel}
              required={required}
              // tooltip={tooltip}
            />
          ) : undefined}
          <TimePicker
            {...{
              ...props,
              className: "custom-date-picker",
            }}
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </LocalizationProvider>
        {errorMessage ? (
          <ErrorMessage
            disabled={disabled}
            text={errorMessage?.text}
            type={errorMessage?.type}
          />
        ) : (
          helperText()
        )}
      </Grid>
    );
  }
);

const datePickerSX = (
  disabled: boolean,
  isErrorMessage: boolean
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  pb: SPACE_MD,
  "& .custom-date-picker": {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: disabled ? "none" : `1px solid #EEEEEE`,
        borderColor: isErrorMessage ? COLOR_RED : " #EEEEEE",
      },
    },
    "& .MuiInputBase-root": {
      borderRadius: "8px",
      fontWeight: "700",
      fontSize: FONT_BODY,
      backgroundColor: disabled ? "#EEEEEE" : "none",
      "&:hover fieldset": {
        borderColor: isErrorMessage ? COLOR_RED : "#EEEEEE",
      },
      "&.Mui-focused": {
        "& fieldset": {
          border: `1px solid #EEEEEE`,
        },
      },
      "&.Mui-error": {
        "& fieldset": {
          borderColor: COLOR_RED,
        },
        "&:hover fieldset": {
          borderColor: COLOR_RED,
        },
        "&.Mui-focused": {
          "& fieldset": {
            border: `1px solid ${COLOR_RED}`,
          },
        },
      },
      "& .MuiInputBase-input": {
        "::placeholder": {
          opacity: 1,
          color: "#E6E6E6",
        },
      },
    },
  },

  "& .MuiFormLabel-root ": {
    fontSize: FONT_BODY,
    fontWeight: "700",
  },
});
