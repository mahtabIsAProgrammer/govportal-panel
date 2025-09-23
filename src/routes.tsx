import { Outlet, type RouteObject } from "react-router-dom";

import { Login } from "./pages/_root/Login";
import { Logout } from "./pages/_root/Logout";
import { CitizenLayout } from "./components/layouts/CitizenLayout";
import { DashboardLayout } from "./components/layouts/DashboardLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "/dashboard/*", element: <DashboardLayout /> },
      { path: "/citizen/*", element: <CitizenLayout /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
    ],
  },
];
