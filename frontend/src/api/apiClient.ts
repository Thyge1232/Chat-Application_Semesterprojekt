import axios, { AxiosError, AxiosHeaders } from "axios";
import {
  getToken,
  clearToken,
} from "../features/authentication/services/tokenService";
import { API_BASE_URL } from "../config/apiUrl";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  console.log("Interceptor attaching token:", token);
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);
