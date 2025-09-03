import { useQuery } from "react-query";
import { getUsers } from "../configs/apiEndPoint";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users-search"],
    queryFn: () => getUsers(),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};
