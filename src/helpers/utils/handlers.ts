import { map, isArray, isString, isBoolean } from "lodash";

import {
  LOCALE_BY_DIR,
  LANGUAGE_NAME_LOCAL_STORAGE,
} from "../constants/statics";
import { arrayToStringHnadler } from "./array";
import { errorAlert, successAlert } from "./messages";

export const tryCatchHandler = async ({
  handler,
  notShowMessage,
  errorCallback,
  successMessage,
}: {
  successMessage?: string;
  handler: TEmptyVoidFunction;
  errorCallback?: (error: TAny) => void;
  notShowMessage?: { isErrorMessage?: boolean; isSuccessMessage?: boolean };
}) => {
  const { isErrorMessage, isSuccessMessage } = notShowMessage || {};
  try {
    const result = (await handler()) || ({ data: {} } as TAny);
    const {
      data: { succeeded, messages },
    } = result;

    if (isBoolean(succeeded) && succeeded == false) throw messages;

    if (!isSuccessMessage && (succeeded == undefined || succeeded == true))
      successAlert({
        title: successMessage ?? "operation_success",
      });
    return result;
  } catch (error) {
    console.info("error:", error);
    if (errorCallback) errorCallback(error);
    if (!isErrorMessage) errorHookHandler({ error });
    return undefined;
  }
};

export const getCurrentDir = (): TDirection =>
  LOCALE_BY_DIR.rtl.includes(
    localStorage.getItem(LANGUAGE_NAME_LOCAL_STORAGE) as TLanguages
  )
    ? "rtl"
    : "ltr";

export const localNavigateHandler = (path: string) => {
  if (!path.startsWith("/")) location.pathname = location.pathname + "/" + path;
  else location.assign(path);
};

export const responsePropsByLengthOnStandard = (
  length: number
): IResponsePropsMui => ({
  xl:
    length > 1
      ? length > 2
        ? length > 3
          ? length > 4
            ? 1.9
            : 2.9
          : 3.9
        : 5.9
      : 12,
  lg:
    length > 1
      ? length > 2
        ? length > 3
          ? length > 4
            ? 1.9
            : 2.9
          : 3.9
        : 5.9
      : 12,
  md: length > 1 ? (length > 2 ? 3.9 : 5.9) : 12,
  sm: length > 1 ? 5.9 : 12,
  xs: 12,
});

export const errorHandler = (error: TAny) => {
  const messages = [];

  const responseErr = error?.resposne;

  if (
    responseErr?.status === 400 &&
    responseErr?.data?.exception?.includes("alreadyexists")
  )
    messages.push("Already Exist");

  if (responseErr?.status === 403) messages.push("Access Denied");
  if (error?.code === "ERR_NETWORK") messages.push("Network Error");
  if (responseErr?.status === 401) messages.push("Fail Authenitcate Error");

  return messages.length > 0
    ? messages.length == 1
      ? messages[0]
      : messages
    : error;
};

export const errorHookHandler = ({ error }: { error: TAny }) => {
  const errorMessege = errorHandler(error);

  const responseErr = error?.resposne;

  errorAlert({
    title: isString(errorMessege)
      ? errorMessege
      : isArray(errorMessege)
      ? arrayToStringHnadler(
          map(errorMessege, (i) => i),
          " | "
        )
      : isArray(responseErr?.data)
      ? arrayToStringHnadler(responseErr?.data, " | ")
      : isArray(responseErr?.data?.messages)
      ? arrayToStringHnadler(responseErr?.data?.messages, " | ")
      : isString(responseErr?.data)
      ? responseErr?.data
      : responseErr?.data?.exception ??
        responseErr?.data?.title ??
        "Server Side Error",
  });
};
