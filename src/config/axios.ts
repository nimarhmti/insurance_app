import axios from "axios";
import { notification } from "antd";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use Vite environment variable
  timeout: 10000,
  // withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "*";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Redirect to login if unauthorized
        //we don`t have login route so navigate the user to baseurl
        window.location.href = "/";
      }

      const errorMessage = error.response.data?.message || "An error occurred";
      notification.error({
        message: "Error",
        description: errorMessage,
      });
    } else if (error.request) {
      notification.error({
        message: "Error",
        description: "No response received from server",
      });
    } else {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
