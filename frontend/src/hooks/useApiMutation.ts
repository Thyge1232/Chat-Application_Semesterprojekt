//hook til vores mutation requests (create, update, delete)
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
): UseMutationResult<TData, unknown, TVariables> {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
}

/*eksempler på anvendelse: 
Lav en burger:
const createUser = useApiMutation<User, CreateUserDto>(
  (dto) => usersApi.create(dto),
  {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  }
);

opdater brugeren
const updateUser = useApiMutation<User, { id: string; dto: UpdateUserDto }>(
  ({ id, dto }) => usersApi.update(id, dto),
  {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  }
);

slet brugeren
const deleteUser = useApiMutation<void, string>(
  (id) => usersApi.remove(id),
  {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  }
);
*/
