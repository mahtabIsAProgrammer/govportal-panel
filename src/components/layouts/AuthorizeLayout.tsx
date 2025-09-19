import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, type FC, type JSX } from "react";

import { TOKEN_VALUE } from "../../helpers/constants/statics";
import { useIdentityVerify } from "../../services/hooks/auth";
import { errorHookHandler } from "../../helpers/utils/handlers";

interface TAuthorizeLayout {
  children: JSX.Element;
}

const AuthorizeLayout: FC<TAuthorizeLayout> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutateAsync: identityVerify } = useIdentityVerify();

  const checkVerify = useCallback(async () => {
    if (pathname !== "/login") {
      if (!TOKEN_VALUE) navigate("/login", { replace: true });
      try {
        if (!["/login", "/logout"].includes(pathname))
          await identityVerify(undefined);
      } catch (error) {
        errorHookHandler({ error });
        if (
          [401, 403].includes(+((error as TAny)?.response?.status || 0)) &&
          !["/login", "/logout"].includes(pathname)
        )
          navigate("/logout", { replace: true });
      }
    }
  }, [identityVerify, navigate, pathname]);

  useEffect(() => {
    checkVerify();
  }, [checkVerify, identityVerify, pathname]);
  return <>{children}</>;
};

export default AuthorizeLayout;
