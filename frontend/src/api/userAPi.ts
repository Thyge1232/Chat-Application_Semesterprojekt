import type { User } from "../types/user";
import {
  createItemInBackend,
  getItemFromBackend,
  getListFromBackend,
} from "../api/baseCRUDApi";
import { ENDPOINTS } from "../config/api";
import type { UserSignup } from "../types/userSignup";

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
