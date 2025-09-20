import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createNotification,
  deleteNotification,
  updateNotification,
  getNotificationById,
  getNotificationData,
  type NotificationDataApi,
  updateNotificationIsRead,
} from "../configs/apiEndPoint";

export const useNotificationData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string,
  extraFilter?: {
    is_read?: boolean;
    user_id?: string;
  }
) => {
  return useQuery(
    [
      "notification-data",
      pageNumber,
      pageSize,
      keyword,
      extraFilter?.is_read,
      extraFilter?.user_id,
    ],
    () =>
      getNotificationData({
        pageNumber,
        pageSize,
        keyword,
        is_read: extraFilter?.is_read,
        user_id: extraFilter?.user_id,
      })
  );
};

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
        queryKey: ["notification-data"],
      });
    },
  });
};

export const useUpdateNotificationIsReadData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) => updateNotificationIsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification-data"],
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
        queryKey: ["notification-data"],
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
        queryKey: ["notification-data"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
