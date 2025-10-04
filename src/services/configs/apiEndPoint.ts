import apiClient from "./apiClient";

export type TAdminTypes =
  | "citizen"
  | "officer"
  | "department_head"
  | "admin"
  | "";

export interface UserDataApi {
  id?: string;
  first_name?: string;
  last_name?: string;
  national_id?: string;
  date_of_birth?: string | null;
  username?: string;
  email?: string;
  password?: string;
  role?: TAdminTypes;
  phone_number?: string;
  department_id?: number | null;
  gender?: number | null;
  image?: string;
  created_at?: string;
  updated_at?: string;
}
export interface DepartmentDataApi {
  id?: number;
  name?: string;
  description?: string;
}
export interface DocumentDataApi {
  id?: number;
  request_id?: number;
  file_path?: string;
  file_type?: string;
  updated_at?: Date;
}
export interface NotificationDataApi {
  id?: number;
  user_id?: string;
  title?: string;
  message?: string;
  is_read?: boolean;
  created_at?: Date;
}
export interface PaymentDataApi {
  id?: number;
  amount?: number;
  status?: string;
  request_id?: number;
  payment_date?: string;
  transaction_id?: string;
  created_at?: string;
}
export interface RequestDataDataApi {
  id?: number;
  request_id?: number;
  form_data?: JSON;
}
export interface RequestDataApi {
  id?: number;
  service_id?: number;
  citizen_id?: string;
  status?: number | null;
  submitted_at?: Date;
  reviewed_by?: string | null;
}

export interface SubmitRequestWithPaymentDataApi {
  service_id?: number;
  form_data?: { fields: JSON };
  amount?: number;
}

export interface ServiceDataApi {
  id?: number;
  department_id?: number | null;
  name?: string;
  description?: string;
  fee?: number | null;
  form_schema?: { fields?: object[] } | null;
  created_at?: Date;
}

export const getToken = async ({ identifier, password }: TAny) =>
  await apiClient.post("/auth/login", { identifier, password });

export const registerCitizen = async (data: TAny) =>
  await apiClient.post("/auth/register", data);

export const identityVerify = async () =>
  await apiClient.get("/auth/verify").then((res) => res.data);

// users

export const getUserData = async (params: TAny) =>
  await apiClient.get("/users", { params: params }).then((res) => res.data);

export const getUserById = (id: string) => apiClient.get(`users/${id}`);

export const createUser = (data: UserDataApi) => apiClient.post("/users", data);

export const updateUser = (id: string, data: UserDataApi) =>
  apiClient.put(`/users/${id}`, data);

// profile
export const getProfileInfo = async () =>
  await apiClient.get("/profile-info").then((res) => res.data);

export const changePassword = async ({ oldPassword, newPassword }: TAny) =>
  await apiClient.put("/profile-info/password", { oldPassword, newPassword });
// Other Crud

export const getDepartmentData = async (params: TAny) =>
  await apiClient
    .get("/departments", { params: params })
    .then((res) => res.data);

export const getDepartmentById = (id: number) =>
  apiClient.get(`departments/${id}`);

export const createDepartment = (data: DepartmentDataApi) =>
  apiClient.post("/departments", data);

export const updateDepartment = (id: number, data: DepartmentDataApi) =>
  apiClient.put(`/departments/${id}`, data);

export const deleteDepartment = (id: number) =>
  apiClient.delete(`/departments/${id}`);

// Other Crud

export const getDocumentData = async (params: TAny) =>
  await apiClient
    .get("/dcocuments", { params: params })
    .then((res) => res.data);

export const getDocumentById = (id: string) => apiClient.get(`documents/${id}`);

export const createDocument = (data: DocumentDataApi) =>
  apiClient.post("/documents", data);

export const updateDocument = (id: string, data: DocumentDataApi) =>
  apiClient.put(`/documents/${id}`, data);

export const deleteDocument = (id: string) =>
  apiClient.delete(`/documents/${id}`);

// Other Crud

export const getNotificationData = async (params: TAny) =>
  await apiClient
    .get("/notifications", { params: params })
    .then((res) => res.data);

export const getNotificationById = (id: string) =>
  apiClient.get(`notifications/${id}`);

export const createNotification = (data: NotificationDataApi) =>
  apiClient.post("/notifications", data);

export const updateNotification = (id: string, data: NotificationDataApi) =>
  apiClient.put(`/notifications/${id}`, data);

export const updateNotificationIsRead = (ids: number[]) =>
  apiClient.patch(`/notifications/is-read`, { ids });

export const deleteNotification = (id: string) =>
  apiClient.delete(`/notifications/${id}`);

// Other Crud

export const getPaymentData = async (params: TAny) =>
  await apiClient.get("/payments", { params: params }).then((res) => res.data);

export const getPaymentById = (id: number) => apiClient.get(`payments/${id}`);

export const getPaymentByRequestId = (id: number) =>
  apiClient.get(`payments/requests/${id}`);

export const createPayment = (data: PaymentDataApi) =>
  apiClient.post("/payments", data);

export const updatePayment = (id: number, data: PaymentDataApi) =>
  apiClient.put(`/payments/${id}`, data);

export const deletePayment = (id: number) =>
  apiClient.delete(`/payments/${id}`);
// Other Crud

export const getRequestDataData = async (params: TAny) =>
  await apiClient
    .get("/request-data", { params: params })
    .then((res) => res.data);

export const createRequestData = async (data: RequestDataDataApi) => {
  const res = await apiClient.post("/request-data", data);
  return res.data;
};
export const updateRequestStatus = async (id: number, status: number) => {
  await apiClient.patch(`/requests/${id}/status`, { status });
};

export const getRequestDateByRequestId = async (id: number) =>
  await apiClient.get(`request-data/${id}`);
// Other Crud

export const getRequestData = async (params: TAny) =>
  await apiClient.get("/requests", { params: params }).then((res) => res.data);

export const getMyRequestData = async (params: TAny) =>
  await apiClient
    .get("/requests/my-requests", { params: params })
    .then((res) => res.data);

export const getRequestById = async (id: number) =>
  await apiClient.get(`requests/${id}`);

export const createRequest = async (data: RequestDataApi) =>
  await apiClient.post("/requests", data);

export const updateRequest = async (id: number, data: RequestDataApi) =>
  await apiClient.put(`/requests/${id}`, data);

export const deleteRequest = (id: number) =>
  apiClient.delete(`/requests/${id}`);

export const submitRequestWithPayment = async (
  data: SubmitRequestWithPaymentDataApi
) => {
  const res = await apiClient.post("/requests/submit", data);
  return res.data;
};
// Other Crud

export const getServiceData = async (params: TAny) =>
  await apiClient.get("/services", { params: params }).then((res) => res.data);

export const getServiceById = (id: number) => apiClient.get(`services/${id}`);

export const createService = (data: ServiceDataApi) =>
  apiClient.post("/services", data);

export const updateService = (id: number, data: ServiceDataApi) =>
  apiClient.put(`/services/${id}`, data);

export const deleteService = (id: number) =>
  apiClient.delete(`/services/${id}`);
// Other Crud

// charts:
export const getRequestsByStatusChart = async () => {
  const res = await apiClient.get("/charts/requests/status");
  return res.data;
};

export const getRequestsByServiceChart = async () => {
  const res = await apiClient.get("/charts/requests/service");
  return res.data;
};

export const getRequestsByMonthChart = async () => {
  const res = await apiClient.get("/charts/requests/month");
  return res.data;
};

export const getRequestsByOfficerChart = async () => {
  const res = await apiClient.get("/charts/requests/officer");
  return res.data;
};

export const getApprovalRejectionRatesChart = async () => {
  const res = await apiClient.get("/charts/requests/approval-rejection");
  return res.data;
};

export const getPaymentsByMonthChart = async () => {
  const res = await apiClient.get("/charts/payments/month");
  return res.data;
};

export const getPaymentsByServiceChart = async () => {
  const res = await apiClient.get("/charts/payments/service");
  return res.data;
};

export const getTotalCitizensChart = async () => {
  const res = await apiClient.get("/charts/citizens/total");
  return res.data;
};

export const getTotalOfficersChart = async () => {
  const res = await apiClient.get("/charts/officers/total");
  return res.data;
};

export const getTotalDepartmentHeadChart = async () => {
  const res = await apiClient.get("/charts/dept-head/total");
  return res.data;
};

export const getTotalUsersChart = async () => {
  const res = await apiClient.get("/charts/all/total");
  return res.data;
};

export const getTotalAdminsChart = async () => {
  const res = await apiClient.get("/charts/admin/total");
  return res.data;
};
