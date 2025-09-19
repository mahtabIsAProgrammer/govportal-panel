import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TOKEN_NAME } from "../../helpers/constants/statics";
import { queryClient } from "../../helpers/utils/reactQuery";

export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem(TOKEN_NAME);
    queryClient.clear();
    navigate("/login");
  }, [navigate]);
  return <></>;
};
