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
  keyword?: number,
  extraFilter?: {
    department_id?: number;
  }
) =>
  useQuery(
    ["service-data", pageNumber, pageSize, keyword, extraFilter?.department_id],
    () =>
      getServiceData({
        pageNumber,
        pageSize,
        keyword,
        department_id: extraFilter?.department_id,
      })
  );

// Get service by id
export const useGetServiceById = (id?: number) => {
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
        queryKey: ["service-data"],
      });
    },
  });
};

// Update a service
export const useUpdateService = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceDataApi) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-data"],
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
    mutationFn: (id: number) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-data"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
