import moment from "moment";
import type { NamedExoticComponent } from "react";
// import jalaliMoment from "jalali-moment";
import {
  CustomDatePickerEnglish,
  CustomDatePickerPersian,
  CustomDateTimePickerEnglish,
  CustomDateTimePickerPersian,
  type ICustomDatePicker,
  type ICustomDateTimePicker,
} from "../../components/controllers/CustomDatePicker";
import { tryCatchHandler } from "./handlers";

export const DateTimePickerComponentObject: {
  [key in TLanguages]: NamedExoticComponent<ICustomDateTimePicker>;
} = {
  fa: CustomDateTimePickerPersian,
  en: CustomDateTimePickerEnglish,
};

export const DatePickerComponentObject: {
  [key in TLanguages]: NamedExoticComponent<ICustomDatePicker>;
} = {
  fa: CustomDatePickerPersian,
  en: CustomDatePickerEnglish,
};

export const DateFormatIsoMOMENT = (
  value: string | null | undefined | Date
) => {
  let valueReturn = "";
  tryCatchHandler({
    notShowMessage: { isErrorMessage: true, isSuccessMessage: true },
    handler: () => {
      valueReturn = value ? moment(value).format("YYYY-MM-DD") : "";
    },
  });
  return valueReturn;
};

export const DateTimeFormatIsoMOMENT = (
  value: string | null | undefined | Date
) => {
  let valueReturn = "";
  tryCatchHandler({
    notShowMessage: { isErrorMessage: true, isSuccessMessage: true },
    handler: () => {
      valueReturn = value ? moment(value).format("YYYY-MM-DDTHH:mm") : "";
    },
  });
  return valueReturn;
};
