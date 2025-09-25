import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, type FC, type JSX } from "react";

import { TOKEN_NAME } from "../../helpers/constants/statics";
import { useIdentityVerify } from "../../services/hooks/auth";
import { errorHookHandler } from "../../helpers/utils/handlers";

interface TAuthorizeLayout {
  children: JSX.Element;
}

const AuthorizeLayout: FC<TAuthorizeLayout> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutateAsync: identityVerify } = useIdentityVerify();

  const publicPaths = useMemo(() => ["/login", "/logout", "/register"], []);

  const checkVerify = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_NAME);

    if (!publicPaths.includes(pathname)) {
      if (!token) navigate("/login", { replace: true });
      try {
        if (!publicPaths.includes(pathname)) await identityVerify(undefined);
      } catch (error) {
        errorHookHandler({ error });
        if (
          [401, 403].includes(+((error as TAny)?.response?.status || 0)) &&
          !publicPaths.includes(pathname)
        )
          navigate("/logout", { replace: true });
      }
    }
  }, [identityVerify, navigate, pathname, publicPaths]);

  useEffect(() => {
    checkVerify();
  }, [checkVerify, identityVerify, pathname]);
  return <>{children}</>;
};

export default AuthorizeLayout;
