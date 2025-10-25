import { apiClient } from "./apiClient";

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
      const response = await axiosInstance.get<T[]>(endpoint);
      return response.data;
    },
    async get(id: string) {
      const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
      return response.data;
    },
    async create(dto: CreateDto) {
      const response = await axiosInstance.post<T>(endpoint, dto);
      return response.data;
    },
    async update(id: string, dto: UpdateDto) {
      const response = await axiosInstance.put<T>(`${endpoint}/${id}`, dto);
      return response.data;
    },
    async remove(id: string) {
      await apiClient.delete(`${endpoint}/${id}`);
    },
  };
}

export async function getListFromBackend<T>(endpoint: string) {
  const response = await axiosInstance.get<T[]>(endpoint);
  return response.data;
}

export async function getItemFromBackend<T>(endpoint: string, id: string) {
  const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
  return response.data;
}

export async function createItemInBackend<Dto>(endpoint: string, dto: Dto) {
  const response = await axiosInstance.post<Dto>(endpoint, dto);
  return response.data;
}

export async function updateItemInBackend<Dto>(
  endpoint: string,
  id: string,
  dto: Dto
) {
  const response = await axiosInstance.put<Dto>(`${endpoint}/${id}`, dto);
  return response.data;
}
export async function deleteItemFromBackend(endpoint: string, id: string) {
  await axiosInstance.delete(`${endpoint}/${id}`);
}
