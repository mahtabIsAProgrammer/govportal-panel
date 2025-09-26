import { Outlet, type RouteObject } from "react-router-dom";

import {
  MyProfileList,
  MyRequestsPage,
  MyProfileAddEdit,
  MyRequestViewPage,
  ChangePasswordPage,
  CitizenPaymentPage,
  RequestCitizenPagePage,
  DepartmentCitizenPagePage,
} from "../../helpers/others/routeControl";
import { Landing } from "../../pages/_root/Landing";
import { NotFound } from "../../pages/_root/NotFound";

export const citizenRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <Landing /> },
      {
        path: "/departments/:id",
        element: <DepartmentCitizenPagePage />,
      },
      {
        path: "/services/:id",
        element: <RequestCitizenPagePage />,
      },
      {
        path: "/my-request",
        children: [
          { index: true, element: <MyRequestsPage /> },
          { path: "view/:id", element: <MyRequestViewPage /> },
        ],
      },
      {
        path: "/payment/:id",
        element: <CitizenPaymentPage />,
      },
      {
        path: "/me",
        children: [
          { index: true, element: <MyProfileList isCitizen /> },
          { path: "edit/:id", element: <MyProfileAddEdit isCitizen /> },
          {
            path: "change-password",
            element: <ChangePasswordPage isCitizen />,
          },
        ],
      },
    ],
  },
];
