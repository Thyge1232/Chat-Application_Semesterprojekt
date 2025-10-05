import { useMutation } from "@tanstack/react-query";
import { ENDPOINTS } from "../config/api";
import type { LoginCredentials } from "../types/loginCredentials";

export const useLogin = () => {
  return useMutation<string, Error, LoginCredentials>({
    mutationFn: async ({ username, password }: LoginCredentials) => {
      const res = await fetch(ENDPOINTS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login oplysningerne er ugyldige");

      const token = await res.text();
      localStorage.setItem("authToken", token);
      return token;
    },
  });
};
