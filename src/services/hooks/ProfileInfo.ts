import { useMutation, useQuery } from "react-query";

import { changePassword, getProfileInfo } from "../configs/apiEndPoint";

export const useGetProfileInfo = () =>
  useQuery(["profile-info"], () => getProfileInfo());

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => undefined,
    onError: (err) => console.log("Changong password failed" + err),
  });
};
