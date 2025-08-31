// import { useLocation, useNavigate } from "react-router-dom";
import { type FC, type JSX } from "react";

// import { TOKEN_NAME } from "../../helpers/constants/statics";

interface TAuthorizeLayout {
  children: JSX.Element;
}

const AuthorizeLayout: FC<TAuthorizeLayout> = ({ children }) => {
  //   const navigate = useNavigate();
  //   const { pathname } = useLocation();

  //   const { mutateAsync: identityVerify } = useIdentityVerify();

  //   const checkVerify = useCallback(async () => {
  //     if (pathname !== "/login") {
  //       if (!TOKEN_NAME) navigate("/login", { replace: true });
  //       try {
  //         if (!["/login", "/logout "].includes(pathname))
  //           await identityVerify(undefined);
  //       } catch (error) {
  //         console.log(error);
  //         if (
  //           +((error as TAny)?.resposne?.status || 0) == 401 &&
  //           !["/login", "/logout"].includes(pathname)
  //         )
  //           navigate("/logout", { replace: true });
  //       }
  //     }
  //   }, [identityVerify, navigate, pathname]);

  //   useEffect(() => {
  //     checkVerify();
  //   }, [checkVerify, identityVerify, pathname]);

  return <>{children}</>;
};

export default AuthorizeLayout;
