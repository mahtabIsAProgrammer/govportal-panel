import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  renderTimeViewClock,
  type TimePickerProps,
  type DatePickerProps,
  type DateTimePickerProps,
} from "@mui/x-date-pickers";
import { memo, useCallback } from "react";
import { Grid, type SxProps, type Theme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

import {
  COLOR_RED,
  COLOR_BORDER,
  COLOR_PRIMARY,
} from "../../helpers/constants/colors";
import { CustomLabel } from "./CustomLabel";
import { ErrorMessage } from "./CustomTextfield";
import { SPACE_MD } from "../../helpers/constants/spaces";
import { FONT_BODY } from "../../helpers/constants/fonts";

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
      className="custom-date-picker"
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
  opacity: disabled ? 0.4 : 1,
  "& .MuiPickersInputBase-root": {
    borderRadius: "12px",
    fontFamily: "Poppins",
    "& fieldset": {
      border: disabled ? "none" : `1px solid ${COLOR_BORDER}`,
      borderColor: isErrorMessage ? COLOR_RED : COLOR_BORDER,
    },
    "&.Mui-focused": {
      backgroundColor: `${COLOR_PRIMARY}10 !important`,
    },
    "&:hover fieldset": {
      borderColor: !isErrorMessage
        ? disabled
          ? "none"
          : COLOR_PRIMARY
        : COLOR_RED,
    },
  },
  "& .MuiInputBase-input": {
    "&::placeholder": {
      color: `${"#A3A3A3"} !important`,
    },
  },
  "& .MuiFormLabel-root ": {
    fontSize: FONT_BODY,
    fontWeight: "700",
  },
});
