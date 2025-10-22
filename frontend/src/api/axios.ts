import axios, { AxiosError } from "axios";
import { getToken, clearToken } from "../services/tokenService";
import { API_BASE_URL } from "../config/api";

/**
 * Axios instance for all our http requests
 *
 * @remarks
 * - Setsup our base URL (`API_BASE_URL`)
 * - applies header and token
 * - clears token if `401 Unauthorized` responses.
 *
 * @example
 * ```ts
 * import { axiosInstance } from "../api/axios";
 *
 * const res = await axiosInstance.get("/users");
 * console.log(res.data);
 * ```
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * request interceptor
 * - adds `Authorization` header with bearer token
 */

axiosInstance.interceptors.request.use(
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

/**
 * response interceptor
 * - passes successful responses unless `401 Unauthorized`
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);
