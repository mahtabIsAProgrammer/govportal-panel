import { useMutation, useQuery } from "react-query";

import { changePassword, getProfileInfo } from "../configs/apiEndPoint";
import { queryClient } from "../../helpers/utils/reactQuery";

export const useGetProfileInfo = () =>
  useQuery(["profile-info"], () => getProfileInfo());

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-info"],
      });
    },
    onError: (err) => console.log("Changong password failed" + err),
  });
};
