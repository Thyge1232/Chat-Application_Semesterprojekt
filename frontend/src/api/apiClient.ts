import axios, { AxiosError } from "axios";
import { getToken, clearToken } from "../services/tokenService";
import { API_BASE_URL } from "../config/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);
