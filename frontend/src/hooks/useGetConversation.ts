import { useApiQuery } from "./useApiQuery";
import { messagesApi } from "../api/messageApi";
import type { Message } from "../types/message";

export function useGetConversation(conversationId?: number) {
  return useApiQuery<Message[]>(
    ["conversation", conversationId],
    () => messagesApi.getByConversation(conversationId!),
    { enabled: conversationId != null }
  );
}
