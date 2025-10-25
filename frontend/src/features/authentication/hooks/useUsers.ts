import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../types/user";
import { ENDPOINTS } from "../../../config/api";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(ENDPOINTS.users);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      return res.json();
    },
  });
};
