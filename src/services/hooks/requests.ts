import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createRequest,
  deleteRequest,
  updateRequest,
  getRequestById,
  getRequestData,
  updateRequestStatus,
  type RequestDataApi,
  submitRequestWithPayment,
  type SubmitRequestWithPaymentDataApi,
  getMyRequestData,
} from "../configs/apiEndPoint";

export const useRequestData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string,
  extraFilter?: {
    status?: boolean;
  }
) =>
  useQuery(
    ["request-data", pageNumber, pageSize, keyword, extraFilter?.status],
    () =>
      getRequestData({
        pageNumber,
        pageSize,
        keyword,
        status: extraFilter?.status,
      })
  );

export const useGetMyRequestData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string,
  extraFilter?: {
    status?: boolean;
  }
) =>
  useQuery(
    ["my-request-data", pageNumber, pageSize, keyword, extraFilter?.status],
    () =>
      getMyRequestData({
        pageNumber,
        pageSize,
        keyword,
        status: extraFilter?.status,
      })
  );

// Get request by id
export const useGetRequestById = (id?: number) => {
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
        queryKey: ["request-data"],
      });
    },
  });
};

// Update a request
export const useUpdateRequest = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RequestDataApi) => updateRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-data"],
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

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: TAny) => updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["request-get"],
      });
    },
  });
};

// Delete a request
export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-data"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

export const useSubmitRequestWithPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubmitRequestWithPaymentDataApi) =>
      submitRequestWithPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-data"],
      });
    },
  });
};
