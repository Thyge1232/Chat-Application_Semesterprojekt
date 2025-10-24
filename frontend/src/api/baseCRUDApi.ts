import { apiClient } from "./apiClient";

/**
 * Our base crud operations
 *
 * @remarks
 * - uses our shared `axiosInstance` for all requests
 * - atm we have list, get, update, create and remove, can expand
 *
 * @examples
 * ```ts
 * import { createResourceApi } from "../api/resourceApi";
 * import { User, CreateUserDto, UpdateUserDto } from "../types/user";
 *
 * //setup resource api for users
 * const userApi = createResourceApi<User, CreateUserDto, UpdateUserDto>("/users");
 *
 * //list all users
 * const users = await userApi.list();
 *
 * //get a single user
 * const user = await userApi.get("123");
 *
 * //create a new user
 * const newUser = await userApi.create({ name: "Alice" });
 *
 * //update a user
 * const updatedUser = await userApi.update("123", { name: "Bob" });
 *
 * //remove a user
 * await userApi.remove("123");
 * ```
 */

export interface IResourceApi<T, CreateDto, UpdateDto> {
  //create request:
  create(dto: CreateDto): Promise<T>; //til at oprette //Read requests:

  //read requests
  list(): Promise<T[]>; //fx til opslag af alle users
  get(id: string): Promise<T>; //til at få fat i specific enhed - fx en bruger

  //update request
  update(id: string, dto: UpdateDto): Promise<T>; //fx til at tilføje brugere eller ændre i ting

  //delete request
  remove(id: string): Promise<void>; //fx til at slette beskeder, fjerne brugere fra conversations mm
}

export function createResourceApi<T, CreateDto, UpdateDto>(
  endpoint: string
): IResourceApi<T, CreateDto, UpdateDto> {
  return {
    async list() {
      const response = await apiClient.get<T[]>(endpoint);
      return response.data;
    },
    async get(id: string) {
      const response = await apiClient.get<T>(`${endpoint}/${id}`);
      return response.data;
    },
    async create(dto: CreateDto) {
      const response = await apiClient.post<T>(endpoint, dto);
      return response.data;
    },
    async update(id: string, dto: UpdateDto) {
      const response = await apiClient.put<T>(`${endpoint}/${id}`, dto);
      return response.data;
    },
    async remove(id: string) {
      await apiClient.delete(`${endpoint}/${id}`);
    },
  };
}
