import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createUser,
  updateUser,
  getUserById,
  getUserData,
  type UserDataApi,
} from "../configs/apiEndPoint";

export const useUserData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["users-data", pageNumber, pageSize, keyword], () =>
    getUserData({ pageNumber, pageSize, keyword })
  );

// Get user by id
export const useGetUserById = (id?: string) => {
  return useQuery({
    queryKey: ["user-get", id],
    queryFn: async () => (id ? await getUserById(id!) : {}),
  });
};

// Create a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserDataApi) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
      });
    },
  });
};

// Update a user
export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserDataApi) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
