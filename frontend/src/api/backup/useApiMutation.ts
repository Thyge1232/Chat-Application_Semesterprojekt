// import {
//   useMutation,
//   type UseMutationOptions,
//   type UseMutationResult,
// } from "@tanstack/react-query";

// export function useApiMutation<TData, TVariables>(
//   mutationFn: (variables: TVariables) => Promise<TData>,
//   options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
// ): UseMutationResult<TData, unknown, TVariables> {
//   return useMutation<TData, unknown, TVariables>({
//     mutationFn,
//     ...options,
//   });
// }
