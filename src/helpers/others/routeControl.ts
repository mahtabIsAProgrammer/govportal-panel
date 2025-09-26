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
export const RequestsView = lazy(() => import("../../pages/requests/View"));

export const PaymentsList = lazy(() => import("../../pages/payments"));
export const PaymentsAddEdit = lazy(
  () => import("../../pages/payments/AddEdit")
);

export const DocumentsList = lazy(() => import("../../pages/documents"));
export const DocumentsAddEdit = lazy(
  () => import("../../pages/documents/AddEdit")
);

export const MyProfileList = lazy(() => import("../../pages/myProfile"));
export const MyProfileAddEdit = lazy(
  () => import("../../pages/myProfile/AddEdit")
);

export const NotificationsList = lazy(
  () => import("../../pages/notifications")
);

export const DepartmentCitizenPagePage = lazy(
  () => import("../../pages/CitizenPages/DepartmentCitizenPage")
);

export const RequestCitizenPagePage = lazy(
  () => import("../../pages/CitizenPages/RequestCitizenPage")
);

export const MyRequestsPage = lazy(
  () => import("../../pages/CitizenPages/MyRequests")
);

export const MyRequestViewPage = lazy(
  () => import("../../pages/CitizenPages/MyRequestView")
);

export const CitizenPaymentPage = lazy(
  () => import("../../pages/CitizenPages/PaymentResultPage")
);

export const ChangePasswordPage = lazy(
  () => import("../../pages/_root/ChangePassword")
);
