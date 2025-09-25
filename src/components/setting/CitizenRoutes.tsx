import { Outlet, type RouteObject } from "react-router-dom";

import { Landing } from "../../pages/_root/Landing";
import { NotFound } from "../../pages/_root/NotFound";
import { DepartmentCitizenPage } from "../../pages/CitizenPages/DepartmentCitizenPage";
import { RequestCitizenPage } from "../../pages/CitizenPages/RequestCitizenPage";
import { CitizenPayment } from "../../pages/CitizenPages/PaymentResultPage";
import { ChangePassword } from "../../pages/_root/ChangePassword";
import {
  MyProfileAddEdit,
  MyProfileList,
} from "../../helpers/others/routeControl";

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
        element: <DepartmentCitizenPage />,
      },
      {
        path: "/services/:id",
        element: <RequestCitizenPage />,
      },
      {
        path: "/payment/:id",
        element: <CitizenPayment />,
      },
      {
        path: "/me",
        children: [
          { index: true, element: <MyProfileList isCitizen /> },
          { path: "edit/:id", element: <MyProfileAddEdit isCitizen /> },
          { path: "change-password", element: <ChangePassword isCitizen /> },
        ],
      },
    ],
  },
];
