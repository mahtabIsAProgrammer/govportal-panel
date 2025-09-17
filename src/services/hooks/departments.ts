import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getDepartmentById,
  getDepartmentData,
  type DepartmentDataApi,
} from "../configs/apiEndPoint";

export const useDepartmentData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["department-data", pageNumber, pageSize, keyword], () =>
    getDepartmentData({ pageNumber, pageSize, keyword })
  );

// Get department by id
export const useGetDepartmentById = (id?: string) => {
  return useQuery({
    queryKey: ["department-get", id],
    queryFn: async () => (id ? await getDepartmentById(id!) : {}),
  });
};

// Create a department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentDataApi) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments-search"],
      });
    },
  });
};

// Update a department
export const useUpdateDepartment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentDataApi) => updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["department-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a department
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
