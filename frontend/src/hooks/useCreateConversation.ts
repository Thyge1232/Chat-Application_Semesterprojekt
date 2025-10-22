import { useApiMutation } from "./useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { conversationApi } from "../api/conversationApi";
import type {
  Conversation,
  CreateConversationDto,
} from "../types/conversation";
/**
 * React Query mutation hook for creating a new conversation.
 *
 * @remarks
 * - Wraps the `conversationApi.create` call in a mutation.
 * - On success, invalidates the `["userConversations"]` query so the
 *   conversation list is refreshed automatically.
 *
 * @returns A mutation object from React Query, including:
 * - `mutate` / `mutateAsync` to trigger the creation
 * - `isPending`, `isError`, `error`, etc. for status handling
 *
 * @example
 * ```tsx
 * const { mutate: createConversation, isPending } = useCreateConversation();
 *
 * createConversation({ name: "My new conversation" });
 * ```
 */

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useApiMutation<Conversation, CreateConversationDto>(
    (dto) => conversationApi.create(dto),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["userConversations"] }),
    }
  );
}
