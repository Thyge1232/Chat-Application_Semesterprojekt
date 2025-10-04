import { useMutation } from "@tanstack/react-query";

const apiLoginEndpoint = "/api/Auth/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await fetch(apiLoginEndpoint, {
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
