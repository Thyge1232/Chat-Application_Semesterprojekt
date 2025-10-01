import { useMutation } from "@tanstack/react-query";

const apiLoginEndpoint = "/api/Auth/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const logininfo = { username, password };

      const res = await fetch(apiLoginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });

      if (!res.ok) throw new Error("Login oplysningerne er ugyldige");

      return res.json();
    },
  });
};
