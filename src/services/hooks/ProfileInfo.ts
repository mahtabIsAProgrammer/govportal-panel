import { useQuery } from "react-query";

import { getProfileInfo } from "../configs/apiEndPoint";

export const useGetProfileInfo = () =>
  useQuery(["profile-info"], () => getProfileInfo());
