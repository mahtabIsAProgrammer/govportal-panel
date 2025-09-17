import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createRequest,
  deleteRequest,
  updateRequest,
  getRequestById,
  getRequestData,
  type RequestDataApi,
} from "../configs/apiEndPoint";

export const useRequestData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["request-data", pageNumber, pageSize, keyword], () =>
    getRequestData({ pageNumber, pageSize, keyword })
  );

// Get request by id
export const useGetRequestById = (id?: string) => {
  return useQuery({
    queryKey: ["request-get", id],
    queryFn: async () => (id ? await getRequestById(id!) : {}),
  });
};

// Create a request
export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RequestDataApi) => createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests-search"],
      });
    },
  });
};

// Update a request
export const useUpdateRequest = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RequestDataApi) => updateRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["request-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a request
export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
