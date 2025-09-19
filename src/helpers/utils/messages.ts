import {
  enqueueSnackbar,
  type SnackbarKey,
  type OptionsObject,
} from "notistack";

import { getCurrentDir } from "./handlers";
import { ActionAlert } from "../../components/controllers/CustomAlert";

interface PropsSimple {
  title: string;
  timer?: number;
  onClickOk?: TEmptyVoidFunction;
  onClickCancel?: TEmptyVoidFunction;
}
type TSimpleAlert = (props: PropsSimple) => void;

const defaultAlert = (): OptionsObject<TAny> => ({
  autoHideDuration: 1000 * 3,
  preventDuplicate: true,
  anchorOrigin: {
    horizontal: getCurrentDir() == "rtl" ? "right" : "left",
    vertical: "bottom",
  },
});

export const errorAlert: TSimpleAlert = ({ title, timer }) => {
  const defaultAlertObj = defaultAlert();
  const { autoHideDuration } = defaultAlertObj;
  enqueueSnackbar(title, {
    variant: "error",
    ...defaultAlertObj,
    autoHideDuration: timer ?? autoHideDuration,
    timer: timer ?? autoHideDuration,
  });
};

export const successAlert: TSimpleAlert = ({ title, timer }) => {
  const defaultAlertObj = defaultAlert();
  const { autoHideDuration } = defaultAlertObj;
  enqueueSnackbar(title, {
    variant: "success",
    ...defaultAlertObj,
    autoHideDuration: timer ?? autoHideDuration,
    timer: timer ?? autoHideDuration,
  });
};

export const warningAlert: TSimpleAlert = ({ title, timer }) => {
  const defaultAlertObj = defaultAlert();
  const { autoHideDuration } = defaultAlertObj;
  enqueueSnackbar(title, {
    variant: "warning",
    ...defaultAlertObj,
    autoHideDuration: timer ?? autoHideDuration,
    timer: timer ?? autoHideDuration,
  });
};

export const infoAlert: TSimpleAlert = ({
  title,
  timer,
  onClickOk,
  onClickCancel,
}) => {
  const defaultAlertObj = defaultAlert();
  const { autoHideDuration } = defaultAlertObj;
  enqueueSnackbar(title, {
    variant: "info",
    ...defaultAlertObj,
    persist: onClickOk || onClickCancel ? false : true,
    action: onClickOk
      ? (snackbarId: SnackbarKey) =>
          ActionAlert({ snackbarId, onClickOk, onClickCancel })
      : undefined,
    autoHideDuration: timer ?? autoHideDuration,
  });
};
