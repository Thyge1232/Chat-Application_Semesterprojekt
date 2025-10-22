import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
/**
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useApiQuery<User[], Error>(
 *   ["users"],
 *   async () => {
 *     const res = await fetch(Endpoints.users);
 *     if (!res.ok) throw new Error("Failed to fetch users");
 *     return res.json() as Promise<User[]>;
 *   }
 * );
 *
 * if (error) {
 *   console.error(error.message);
 * }
 * ```
 */

export function useApiQuery<TData, TError = AxiosError>(
  key: string | unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    ...options,
  });
}
