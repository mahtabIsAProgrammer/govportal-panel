import { isString } from "lodash";

export const en2faDigits = (s: string) =>
  s.replace(/[0-9]/g, (w: string) =>
    String.fromCharCode(w.charCodeAt(0) + 1728)
  );
export const priceFormatter = (x: number | string, abs?: boolean) => {
  const value = abs ? Math.abs(+(x || 0)) : x;
  return isString(value)
    ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fa2enDigits = (s: string) =>
  s.replace(/[۰-۹]/g, (w: string) =>
    String.fromCharCode(w.charCodeAt(0) - 1728)
  );
