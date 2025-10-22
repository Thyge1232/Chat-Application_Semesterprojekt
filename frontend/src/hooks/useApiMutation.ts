import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
/**
 * Our base mutation hook
 *
 * @remarks
 * - wraps `useMutation` from react-query
 * - takes a `mutationFn` (async function) and optional options
 * - returns a typed mutation result with status, data, error etc.
 * - can be reused for any POST/PUT/DELETE style request
 *
 * @examples
 * ```ts
 * import { useApiMutation } from "../hooks/useApiMutation";
 * import { conversationApi } from "../api/conversationApi";
 * import { messagesApi } from "../api/messagesApi";
 *
 * //create a conversation
 * const createConversation = useApiMutation(
 *   (dto: CreateConversationDto) => conversationApi.create(dto)
 * );
 *
 * //usage
 * createConversation.mutate({ name: "New Project Chat" });
 *
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
