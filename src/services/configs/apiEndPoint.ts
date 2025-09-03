import apiClient from "./apiClient";

export const getToken = async ({ identifier, password }: TAny) =>
  apiClient.post("/auth/login", { identifier, password });

export const getUsers = async () => {
  apiClient.get("/users").then((res) => res.data);
};
