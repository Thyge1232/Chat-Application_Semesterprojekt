import { getAllUsers } from "../../../api/apiUsers";
import type { User } from "../../users/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getAllUsers();
      return res;
    },
  });
};
