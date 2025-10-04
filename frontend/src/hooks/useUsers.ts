import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user";
const apiUsersEndpoint = "https://api.venner.nu/api/users";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(apiUsersEndpoint);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      return res.json();
    },
  });
};
