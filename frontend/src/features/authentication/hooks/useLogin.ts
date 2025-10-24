import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../config/api";
import type { LoginCredentials } from "../types/loginCredentials";
import { setToken } from "../services/tokenService";
import { getCurrentUser, type CurrentUser } from "../services/authService";

export const useLogin = (): UseMutationResult<
  CurrentUser | null,
  Error,
  LoginCredentials
> => {
  return useMutation<CurrentUser | null, Error, LoginCredentials>({
    mutationFn: async ({ username, password }: LoginCredentials) => {
      const res = await apiClient.post<string>(ENDPOINTS.login, {
        username,
        password,
      });
      const token = res.data;
      setToken(token);
      return getCurrentUser();
    },
  });
};
