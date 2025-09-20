import moment from "moment";
import jalaliMoment from "jalali-moment";
import type { NamedExoticComponent } from "react";

import {
  CustomDatePickerEnglish,
  type ICustomDatePicker,
  CustomDatePickerPersian,
  type ICustomDateTimePicker,
  CustomDateTimePickerEnglish,
  CustomDateTimePickerPersian,
} from "../../components/controllers/CustomDatePicker";
import { GetContextValue, tryCatchHandler } from "./handlers";

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

export const DateTimeFormatBasicMOMENT = (
  value: string | null | undefined | Date,
  lngHandy?: TLanguages | undefined,
  addPersianOffset?: boolean
) => {
  let valueReturn = "";
  tryCatchHandler({
    notShowMessage: { isErrorMessage: true, isSuccessMessage: true },
    handler: () => {
      const lng = lngHandy ? lngHandy : GetContextValue("lng");
      valueReturn = value
        ? lng == "fa"
          ? jalaliMoment(
              addPersianOffset ? jalaliMoment(value).add(210, "m") : value
            ).format("HH:mm jYYYY/jMM/jDD")
          : moment(value).format("MM/DD/YYYY HH:mm")
        : "";
    },
  });
  return valueReturn;
};
