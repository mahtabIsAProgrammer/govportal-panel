import { lazy } from "react";

export const UsersList = lazy(() => import("../../pages/users"));
export const UsersAddEdit = lazy(() => import(`../../pages/users/AddEdit`));
export const UsersView = lazy(() => import(`../../pages/users/View`));

export const DepartmentsList = lazy(() => import("../../pages/departments"));
export const DepartmentsAddEdit = lazy(
  () => import("../../pages/departments/AddEdit")
);

export const ServicesList = lazy(() => import("../../pages/services"));
export const ServicesAddEdit = lazy(
  () => import("../../pages/services/AddEdit")
);

export const RequestsList = lazy(() => import("../../pages/requests"));
export const RequestsAddEdit = lazy(
  () => import("../../pages/requests/AddEdit")
);

export const PaymentsList = lazy(() => import("../../pages/payments"));
export const PaymentsAddEdit = lazy(
  () => import("../../pages/payments/AddEdit")
);

export const DocumentsList = lazy(() => import("../../pages/documents"));
export const DocumentsAddEdit = lazy(
  () => import("../../pages/documents/AddEdit")
);
