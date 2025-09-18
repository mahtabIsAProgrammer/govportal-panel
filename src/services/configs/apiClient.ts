import axios from "axios";
import { API_URL } from "../../helpers/constants/statics";

const apiClient = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
