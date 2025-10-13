import { useApiQuery } from "./useApiQuery";
import { messagesApi } from "../api/ConversationApi";
import type { Message } from "../types/message";

export function useGetConversation(conversationId: number) {
  return useApiQuery<Message[]>(["conversation", conversationId], () =>
    messagesApi.getByConversation(conversationId)
  );
}
