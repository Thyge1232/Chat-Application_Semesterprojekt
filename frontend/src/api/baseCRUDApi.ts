import type { AxiosRequestConfig } from "axios";
import { apiClient } from "./apiClient";

export async function getListFromBackend<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T[]> {
  const response = await apiClient.get<T[]>(endpoint, config);
  return response.data;
}

export async function getItemFromBackend<T>(
  endpoint: string,
  id: number,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.get<T>(`${endpoint}/${id}`, config);
  return response.data;
}

export async function createItemInBackend<RequestDto, ResultDto>(
  endpoint: string,
  dto: RequestDto,
  config?: AxiosRequestConfig
): Promise<ResultDto> {
  const response = await apiClient.post<ResultDto>(endpoint, dto, config);
  return response.data;
}

export async function updateItemInBackend<RequestDto, ResultDto>(
  endpoint: string,
  id: number,
  dto: RequestDto,
  config?: AxiosRequestConfig
): Promise<ResultDto> {
  const response = await apiClient.put<ResultDto>(
    `${endpoint}/${id}`,
    dto,
    config
  );
  return response.data;
}
export async function deleteItemFromBackend(
  endpoint: string,
  id: number,
  config?: AxiosRequestConfig
): Promise<void> {
  await apiClient.delete(`${endpoint}/${id}`, config);
}
