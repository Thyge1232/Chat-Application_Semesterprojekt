import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/apiClient";
import { ENDPOINTS } from "../../../config/api";
import type { LoginCredentials } from "../../../types/loginCredentials";
import { setToken } from "../../../services/tokenService";
import {
  getCurrentUser,
  type CurrentUser,
} from "../../../services/authService";

export function useLogin() {
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
}
