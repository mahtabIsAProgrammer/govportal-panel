import { Outlet, type RouteObject } from "react-router-dom";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { Login } from "./pages/_root/Login";
import { Logout } from "./pages/_root/Logout";

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
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
    ],
  },
];
