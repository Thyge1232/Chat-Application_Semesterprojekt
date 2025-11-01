import type { User } from "../features/users/types/user";
import { ENDPOINTS } from "../config/endpoints";
import type { CreateUserRequest } from "../features/authentication/types/createUserRequest";
import {
  createItemInBackend,
  getItemFromBackend,
  getListFromBackend,
} from "./apiBaseCrud";

export async function getUserInfoById(userId: number): Promise<User> {
  const res = await getItemFromBackend<User>(ENDPOINTS.users.byId(userId));
  return res;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await getListFromBackend<User>(ENDPOINTS.users.all());
  return res;
}

export async function signupUser(
  userData: CreateUserRequest
): Promise<unknown> {
  const res = await createItemInBackend<CreateUserRequest, unknown>(
    ENDPOINTS.users.create(),
    userData
  );
  return res;
}
