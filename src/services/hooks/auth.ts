import { useMutation } from "react-query";

import {
  getToken,
  identityVerify,
  registerCitizen,
} from "../configs/apiEndPoint";
import { queryClient } from "../../helpers/utils/reactQuery";

export const useGetToken = () => {
  return useMutation({
    mutationFn: getToken,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-info"],
      });
    },
    onError: (err) => console.log("Login failed" + err),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerCitizen,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-info"],
      });
    },
    onError: (err) => console.log("Register failed" + err),
  });
};

export const useIdentityVerify = () => {
  return useMutation({
    mutationFn: identityVerify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-info"],
      });
    },
  });
};
