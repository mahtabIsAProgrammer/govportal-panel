import { isBoolean, isEmpty, isNumber, isObject, isString } from "lodash";

export const checkFalsyValue = <T = TAny>(
  value: T,
  falsyNum?: boolean,
  falsyBoolean?: boolean
): value is NonNullable<T> =>
  (isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    (isObject(value) && !isEmpty(value))) &&
  value !== "" &&
  (falsyNum ? +value !== 0 : true) &&
  (falsyBoolean ? value !== false : true);

export const checkUndefiendOrNull = (value: TAny): value is null | undefined =>
  value == null || value == undefined;
