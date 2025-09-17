import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  createDocument,
  deleteDocument,
  updateDocument,
  getDocumentById,
  getDocumentData,
  type DocumentDataApi,
} from "../configs/apiEndPoint";

export const useDocumentData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["document-data", pageNumber, pageSize, keyword], () =>
    getDocumentData({ pageNumber, pageSize, keyword })
  );

// Get document by id
export const useGetDocumentById = (id?: string) => {
  return useQuery({
    queryKey: ["document-get", id],
    queryFn: async () => (id ? await getDocumentById(id!) : {}),
  });
};

// Create a document
export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DocumentDataApi) => createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents-search"],
      });
    },
  });
};

// Update a document
export const useUpdateDocument = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DocumentDataApi) => updateDocument(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents-search"],
      });
      queryClient.invalidateQueries({
        queryKey: ["document-get"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};

// Delete a document
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents-search"],
      });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`Error: ${error || "Something went wrong."}`);
    },
  });
};
