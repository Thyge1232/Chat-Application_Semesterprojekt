import { useApiQuery } from "./useApiQuery";
import { messagesApi } from "../api/messageApi";
import type { Message } from "../types/message";
import { AxiosError } from "axios";

export function useGetConversation(conversationId?: number) {
  return useApiQuery<Message[], AxiosError>(
    ["conversation", conversationId ?? "none"],
    () => messagesApi.getByConversation(conversationId!),
    {
      enabled: conversationId != null,
    }
  );
}
