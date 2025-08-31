import { Grid } from "@mui/material";
import { Suspense, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import { routes } from "../../routes";
import ThemeLayout from "./ThemeLayout";
import { Loading } from "../common/Loading";
import AuthorizeLayout from "./AuthorizeLayout";
import { queryClient } from "../../helpers/utils/reactQuery";
import { MainContextProvider } from "../contexts/MainContext";

export const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const children = useRoutes(routes);

  useEffect(() => {
    if (pathname == "/") navigate("/dashboard", { replace: true });
  }, [navigate, pathname]);
  return (
    <Grid>
      <QueryClientProvider client={queryClient}>
        <MainContextProvider>
          <AuthorizeLayout>
            <ThemeLayout>
              <HelmetProvider>
                <SnackbarProvider>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </SnackbarProvider>
              </HelmetProvider>
            </ThemeLayout>
          </AuthorizeLayout>
        </MainContextProvider>
      </QueryClientProvider>
    </Grid>
  );
};
