import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createService,
  deleteService,
  updateService,
  getServiceById,
  getServiceData,
  type ServiceDataApi,
} from "../configs/apiEndPoint";

export const useServiceData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["service-data", pageNumber, pageSize, keyword], () =>
    getServiceData({ pageNumber, pageSize, keyword })
  );

// Get service by id
export const useGetServiceById = (id?: string) => {
  return useQuery({
    queryKey: ["service-get", id],
    queryFn: async () => (id ? await getServiceById(id!) : {}),
  });
};

// Create a service
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceDataApi) => createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services-search"],
      });
    },
  });
};

// Update a service
export const useUpdateService = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceDataApi) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["service-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a service
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
