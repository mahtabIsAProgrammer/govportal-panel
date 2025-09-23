import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createRequestData,
  getRequestDataData,
  type RequestDataDataApi,
  getRequestDateByRequestId,
} from "../configs/apiEndPoint";

export const useRequestDataData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["request-data-data", pageNumber, pageSize, keyword], () =>
    getRequestDataData({ pageNumber, pageSize, keyword })
  );
// Get request by id
export const useGetRequestDataByRequestId = (id?: number) => {
  return useQuery({
    queryKey: ["request-data-get", id],
    queryFn: async () => (id ? await getRequestDateByRequestId(id!) : {}),
  });
};

// Create a request Data
export const useCreateRequestData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RequestDataDataApi) => createRequestData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-data-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["request-data-get"],
      });
    },
  });
};
