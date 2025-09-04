import { Outlet, type RouteObject } from "react-router-dom";

import {
  UsersList,
  UsersView,
  PaymentsList,
  RequestsList,
  UsersAddEdit,
  ServicesList,
  DocumentsList,
  PaymentsAddEdit,
  RequestsAddEdit,
  ServicesAddEdit,
  DepartmentsList,
  DocumentsAddEdit,
  DepartmentsAddEdit,
} from "../../helpers/others/routeControl";
import { NotFound } from "../../pages/_root/NotFound";
import { Dashboard } from "../../pages/_root/Dashboard";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <Dashboard /> },
      {
        path: "/users",
        children: [
          { index: true, element: <UsersList /> },
          { path: "add", element: <UsersAddEdit /> },
          { path: "edit/:id", element: <UsersAddEdit isEdit /> },
          { path: "view", element: <UsersView /> },
        ],
      },
      {
        path: "/departments",
        children: [
          { index: true, element: <DepartmentsList /> },
          { path: "add", element: <DepartmentsAddEdit /> },
          { path: "edit/:id", element: <DepartmentsAddEdit isEdit /> },
        ],
      },
      {
        path: "/services",
        children: [
          { index: true, element: <ServicesList /> },
          { path: "add", element: <ServicesAddEdit /> },
          { path: "edit/:id", element: <ServicesAddEdit isEdit /> },
        ],
      },
      {
        path: "/requests",
        children: [
          { index: true, element: <RequestsList /> },
          { path: "add", element: <RequestsAddEdit /> },
          { path: "edit/:id", element: <RequestsAddEdit isEdit /> },
        ],
      },
      {
        path: "/payments",
        children: [
          { index: true, element: <PaymentsList /> },
          { path: "add", element: <PaymentsAddEdit /> },
          { path: "edit/:id", element: <PaymentsAddEdit isEdit /> },
        ],
      },
      {
        path: "/documents",
        children: [
          { index: true, element: <DocumentsList /> },
          { path: "add", element: <DocumentsAddEdit /> },
          { path: "edit/:id", element: <DocumentsAddEdit isEdit /> },
        ],
      },
    ],
  },
];
