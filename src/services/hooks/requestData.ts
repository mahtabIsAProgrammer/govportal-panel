import { useQuery } from "react-query";

import { getRequestDataData } from "../configs/apiEndPoint";

export const useRequestDataData = (
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
) =>
  useQuery(["request-data-data", pageNumber, pageSize, keyword], () =>
    getRequestDataData({ pageNumber, pageSize, keyword })
  );
