import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { createItemInBackend, getItemFromBackend } from "../api/baseCRUDApi";
import { ENDPOINTS } from "../config/api";
import type { UserSignup } from "../types/usersignup";
import { get } from "react-hook-form";

export async function getUserInfo(userId: number): Promise<User> {
  const res = await getItemFromBackend<User>(`${ENDPOINTS.users}/${userId}`);
  return res;
}

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

export function useSignup() {
  return useMutation<unknown, unknown, UserSignup>({
    mutationFn: (userData: UserSignup) =>
      createItemInBackend<UserSignup, unknown>(ENDPOINTS.users, userData),
  });
}
