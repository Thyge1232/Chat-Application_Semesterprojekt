//hook til vores read requests
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

export function useApiQuery<TData>(
  key: string | unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">
): UseQueryResult<TData> {
  return useQuery<TData>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    ...options,
  });
}

/*og sådan bruger vi den:

const { data, isLoading, error } = useApiQuery(
  ["users"],
  async () => {
    const res = await fetch(Endpoints.users);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }
);
*/
