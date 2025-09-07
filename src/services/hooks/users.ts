import { useQuery } from "react-query";
import { getUsers } from "../configs/apiEndPoint";

// export const useUsersData = (
//   pageNumber?: number,
//   pageSize?: number,
//   keyword?: string
// ) =>
//   useQuery(
//     ["users-data", pageNumber, pageSize, keyword],
//     getUsers({ pageNumber, pageSize, keyword, orderBy: ["id desc"] }),
//     { keepPreviousData: true }
//   );

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users-search"],
    queryFn: () => getUsers(),
    placeholderData: (prev: TAny) => prev,
    enabled: true,
  });
};
