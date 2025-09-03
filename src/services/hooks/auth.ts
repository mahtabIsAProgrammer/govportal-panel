import { useMutation } from "react-query";
import { getToken } from "../configs/apiEndPoint";

export const useGetToken = () => {
  return useMutation({
    mutationFn: getToken,
    onSuccess: () => undefined,
    onError: (err) => console.log("Login failed" + err),
  });
};
