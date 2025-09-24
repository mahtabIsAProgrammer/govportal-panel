import { useQuery } from "react-query";
import {
  getTotalCitizensChart,
  getTotalOfficersChart,
  getPaymentsByMonthChart,
  getRequestsByMonthChart,
  getRequestsByStatusChart,
  getPaymentsByServiceChart,
  getRequestsByOfficerChart,
  getRequestsByServiceChart,
  getTotalDepartmentHeadChart,
  getApprovalRejectionRatesChart,
  getTotalUsersChart,
  getTotalAdminsChart,
} from "../configs/apiEndPoint";

export const useGetRequestsByStatusChart = () =>
  useQuery(["request-data-by-status"], () => getRequestsByStatusChart());

export const useGetRequestsByServiceChart = () =>
  useQuery(["request-data-by-service"], () => getRequestsByServiceChart());

export const useGetRequestsByMonthChart = () =>
  useQuery(["request-data-by-month"], () => getRequestsByMonthChart());

export const useGetRequestsByOfficerChart = () =>
  useQuery(["request-data-by-officer"], () => getRequestsByOfficerChart());

export const useGetApprovalRejectionRatesChart = () =>
  useQuery(["request-data"], () => getApprovalRejectionRatesChart());

export const useGetPaymentsByMonthChart = () =>
  useQuery(["payment-data"], () => getPaymentsByMonthChart());

export const useGetPaymentsByServiceChart = () =>
  useQuery(["payment-data"], () => getPaymentsByServiceChart());

export const useGetTotalUsersChart = () =>
  useQuery(["user-data-total-all"], () => getTotalUsersChart());

export const useGetTotalAdminsChart = () =>
  useQuery(["user-data-total-admin"], () => getTotalAdminsChart());

export const useGetTotalCitizensChart = () =>
  useQuery(["user-data-total-citizen"], () => getTotalCitizensChart());

export const useGetTotalOfficersChart = () =>
  useQuery(["user-data-total-officers"], () => getTotalOfficersChart());

export const useGetTotalDepartmentHeadChart = () =>
  useQuery(["user-data-total-dept-head"], () => getTotalDepartmentHeadChart());
