import { axiosInstance } from "./axios";

//har sat disse metoder op... skal vi bruge flerE? listet i crud orden
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
      const res = await axiosInstance.get<T[]>(endpoint);
      return res.data;
    },
    async get(id: string) {
      const res = await axiosInstance.get<T>(`${endpoint}/${id}`);
      return res.data;
    },
    async create(dto: CreateDto) {
      const res = await axiosInstance.post<T>(endpoint, dto);
      return res.data;
    },
    async update(id: string, dto: UpdateDto) {
      const res = await axiosInstance.put<T>(`${endpoint}/${id}`, dto);
      return res.data;
    },
    async remove(id: string) {
      await axiosInstance.delete(`${endpoint}/${id}`);
    },
  };
}
