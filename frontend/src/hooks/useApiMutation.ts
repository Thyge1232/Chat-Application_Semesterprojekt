//hook til vores mutation requests (create, update, delete)
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
/**
 * A typed wrapper around React Query's {@link useMutation} hook.
 *
 * @typeParam TData - The type of data returned by the mutation function.
 * @typeParam TVariables - The type of variables accepted by the mutation function.
 *
 * @param mutationFn - An async function that performs the mutation (e.g. create, update, delete).
 * @param options - Optional React Query mutation options (onSuccess, onError, etc.).
 *
 * @returns A {@link UseMutationResult} object containing:
 * - `mutate` / `mutateAsync` to trigger the mutation
 * - `isPending`, `isError`, `error`, etc. for status handling
 *
 * @example
 * ```tsx
 * const { mutate: createUser } = useApiMutation<User, CreateUserDto>(
 *   (dto) => userApi.create(dto),
 *   { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }) }
 * );
 *
 * createUser({ name: "Alice" });
 * ```
 */

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
): UseMutationResult<TData, unknown, TVariables> {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
}
