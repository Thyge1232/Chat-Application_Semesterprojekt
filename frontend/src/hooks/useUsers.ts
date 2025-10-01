import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user"; // adjust path if needed

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/Users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
};
