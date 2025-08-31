import { Outlet, type RouteObject } from "react-router-dom";
import { NotFound } from "../../pages/_root/NotFound";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [{ path: "*", element: <NotFound /> }],
  },
];
