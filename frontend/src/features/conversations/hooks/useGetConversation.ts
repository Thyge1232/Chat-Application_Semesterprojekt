import { AxiosError } from "axios";
import { useApiQuery } from "../../../hooks/useApiQuery";
import { messagesApi } from "../../../api/messageApi";
import type { Message } from "../../../types/message";

export function useGetConversation(conversationId?: number) {
  return useApiQuery<Message[], AxiosError>(
    ["conversation", conversationId ?? "none"],
    () => messagesApi.getByConversation(conversationId!),
    {
      enabled: conversationId != null,
    }
  );
}
