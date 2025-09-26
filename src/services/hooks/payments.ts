import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createPayment,
  deletePayment,
  updatePayment,
  getPaymentById,
  getPaymentData,
  type PaymentDataApi,
  getPaymentByRequestId,
} from "../configs/apiEndPoint";

export const usePaymentData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["payment-data", pageNumber, pageSize, keyword], () =>
    getPaymentData({ pageNumber, pageSize, keyword })
  );

// Get payment by id
export const useGetPaymentById = (id?: number) => {
  return useQuery({
    queryKey: ["payment-get", id],
    queryFn: async () => (id ? await getPaymentById(id!) : {}),
  });
};
// Get payment by id
export const useGetPaymentByRequestId = (id?: number) => {
  return useQuery({
    queryKey: ["payment-get-request", id],
    queryFn: async () => (id ? await getPaymentByRequestId(id!) : {}),
  });
};

// Create a payment
export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentDataApi) => createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments-search"],
      });
    },
  });
};

// Update a payment
export const useUpdatePayment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentDataApi) => updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["payment-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a payment
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
