import { fa2enDigits } from "./numbers";
import { isBoolean, isEmpty, isNumber, isObject, isString } from "lodash";

export const checkFalsyValue = <T = TAny>(
  value: T,
  falsyNumber?: boolean,
  falsyBoolean?: boolean
): value is NonNullable<T> =>
  (isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    (isObject(value) && !isEmpty(value))) &&
  value !== "" &&
  (falsyNumber ? +value !== 0 : true) &&
  (falsyBoolean ? value !== false : true);

export const checkUndefiendOrNull = (value: TAny): value is null | undefined =>
  value == null || value == undefined;

export const checkSubmitValue = <T extends Record<string, TAny>>(values: T) => {
  const finalValues: TAny = {};
  for (const key in values) {
    const value = values[key];
    finalValues[key] = isString(value) ? fa2enDigits(value.trim()) : value;
  }
  return finalValues as T;
};
