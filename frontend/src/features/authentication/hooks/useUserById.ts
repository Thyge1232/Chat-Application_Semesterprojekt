import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../types/user";
import { ENDPOINTS } from "../../../config/api";

export const useUserById = (userId: number | undefined) => {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await fetch(`${ENDPOINTS.users}/${userId}`);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      return res.json();
    },
    enabled: !!userId,
  });
};
