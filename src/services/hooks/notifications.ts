import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createNotification,
  deleteNotification,
  updateNotification,
  getNotificationById,
  getNotificationData,
  type NotificationDataApi,
} from "../configs/apiEndPoint";

export const useNotificationData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["notification-data", pageNumber, pageSize, keyword], () =>
    getNotificationData({ pageNumber, pageSize, keyword })
  );

// Get notification by id
export const useGetNotificationById = (id?: string) => {
  return useQuery({
    queryKey: ["notification-get", id],
    queryFn: async () => (id ? await getNotificationById(id!) : {}),
  });
};

// Create a notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationDataApi) => createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-search"],
      });
    },
  });
};

// Update a notification
export const useUpdateNotification = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationDataApi) => updateNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["notification-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
