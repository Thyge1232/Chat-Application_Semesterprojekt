import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../types/user";
import { getUserInfoById } from "../../../api/userAPi";

export const useUserById = (userId: number | undefined) => {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await getUserInfoById(userId!);
      return res;
    },
    enabled: !!userId,
  });
};
