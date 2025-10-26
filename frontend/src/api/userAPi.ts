import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import {
  createItemInBackend,
  getItemFromBackend,
  getListFromBackend,
} from "../api/baseCRUDApi";
import { ENDPOINTS } from "../config/api";
import type { UserSignup } from "../types/usersignup";

export async function getUserInfoById(userId: number): Promise<User> {
  const res = await getItemFromBackend<User>(ENDPOINTS.users, userId);
  return res;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await getListFromBackend<User>(ENDPOINTS.users);
  return res;
}

export async function signupUser(userData: UserSignup): Promise<unknown> {
  const res = await createItemInBackend<UserSignup, unknown>(
    ENDPOINTS.users,
    userData
  );
  return res;
}

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
