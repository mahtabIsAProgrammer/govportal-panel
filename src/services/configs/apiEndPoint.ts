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
  date_of_birth?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: TAdminTypes;
  phone_number?: string;
  department_id?: number;
  profile_image?: string;
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
  message?: string;
  is_read?: boolean;
  created_at?: Date;
}
export interface PaymentDataApi {
  id?: number;
  amount?: number;
  status?: string;
  request_id?: number;
  payment_Date?: string;
  transaction_id?: number;
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
  status?: string;
  submitted_at?: Date;
  reviewed_by?: string;
}
export interface ServiceDataApi {
  id?: number;
  department_id?: number;
  name?: string;
  description?: string;
  fee?: number;
  form_schema?: JSON;
  created_at?: Date;
}

export const getToken = async ({ identifier, password }: TAny) =>
  await apiClient.post("/auth/login", { identifier, password });

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

// Other Crud

export const getDepartmentData = async (params: TAny) =>
  await apiClient
    .get("/departments", { params: params })
    .then((res) => res.data);

export const getDepartmentById = (id: string) =>
  apiClient.get(`departments/${id}`);

export const createDepartment = (data: DepartmentDataApi) =>
  apiClient.post("/departments", data);

export const updateDepartment = (id: string, data: DepartmentDataApi) =>
  apiClient.put(`/departments/${id}`, data);

export const deleteDepartment = (id: string) =>
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

export const deleteNotification = (id: string) =>
  apiClient.delete(`/notifications/${id}`);

// Other Crud

export const getPaymentData = async (params: TAny) =>
  await apiClient.get("/payments", { params: params }).then((res) => res.data);

export const getPaymentById = (id: string) => apiClient.get(`payments/${id}`);

export const createPayment = (data: PaymentDataApi) =>
  apiClient.post("/payments", data);

export const updatePayment = (id: string, data: PaymentDataApi) =>
  apiClient.put(`/payments/${id}`, data);

export const deletePayment = (id: string) =>
  apiClient.delete(`/payments/${id}`);
// Other Crud

export const getRequestDataData = async (params: TAny) =>
  await apiClient
    .get("/request-data", { params: params })
    .then((res) => res.data);

// Other Crud

export const getRequestData = async (params: TAny) =>
  await apiClient.get("/requests", { params: params }).then((res) => res.data);

export const getRequestById = (id: string) => apiClient.get(`requests/${id}`);

export const createRequest = (data: RequestDataApi) =>
  apiClient.post("/requests", data);

export const updateRequest = (id: string, data: RequestDataApi) =>
  apiClient.put(`/requests/${id}`, data);

export const deleteRequest = (id: string) =>
  apiClient.delete(`/requests/${id}`);
// Other Crud

export const getServiceData = async (params: TAny) =>
  await apiClient.get("/services", { params: params }).then((res) => res.data);

export const getServiceById = (id: string) => apiClient.get(`services/${id}`);

export const createService = (data: ServiceDataApi) =>
  apiClient.post("/services", data);

export const updateService = (id: string, data: ServiceDataApi) =>
  apiClient.put(`/services/${id}`, data);

export const deleteService = (id: string) =>
  apiClient.delete(`/services/${id}`);
// Other Crud
