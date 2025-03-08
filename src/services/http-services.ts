import api from "../config/axios";

export const http = {
  get: <T>(url: string) => api.get<T>(url),
  post: <T>(url: string, body: unknown) => api.post<T>(url, body),
  put: <T>(url: string, body: unknown) => api.put<T>(url, body),
  delete: <T>(url: string) => api.delete<T>(url),
};
