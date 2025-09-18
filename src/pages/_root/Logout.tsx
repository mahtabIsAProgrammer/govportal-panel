import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TOKEN_NAME } from "../../helpers/constants/statics";

export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem(TOKEN_NAME);
    navigate("/login");
  }, [navigate]);
  return <></>;
};
