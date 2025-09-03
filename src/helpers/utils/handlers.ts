// export const handlerCallTryCatch = async ({
//   handler,
//   successMessageContentKT,
//   notShowMessage,
//   errorCallback,
// }: {
//   handler: TEmptyVoidPromiseFunction;
//   errorCallback?: (error: TAnyObjects) => void;
//   successMessageContentKT?: TKeyTranslate;
//   notShowMessage?: { errorMessage?: boolean; successMessage?: boolean };
// }) => {
//   const { errorMessage, successMessage } = notShowMessage || {};
//   try {
//     const result = (await handler()) || ({ data: {} } as TAnyObjects);
//     const {
//       data: { succeeded, messages },
//     } = result;

//     if (isBoolean(succeeded) && succeeded == false) throw messages;

//     if (!successMessage && (succeeded == undefined || succeeded == true))
//       successAlert({
//         title: translateControlWithExtraText(
//           successMessageContentKT ?? "operation_success"
//         ),
//       });
//     return result;
//   } catch (error) {
//     console.info("error:", error);
//     if (errorCallback) errorCallback(error);
//     if (!errorMessage) errorHooksHandler({ error });
//     return undefined;
//   }
// };
