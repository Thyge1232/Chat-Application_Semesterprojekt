import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getMessagesByConversationId } from "../../../api/messageApi";
import type { Message } from "../../../types/message";
import { ENDPOINTS } from "../../../config/api";

export function useGetConversation(conversationId?: number) {
  return useQuery<Message[], AxiosError>({
    queryKey: [ENDPOINTS.messages, conversationId],
    queryFn: async () => {
      if (conversationId == null) throw new Error("Fejl i conversationId");
      return getMessagesByConversationId(conversationId);
    },
    enabled: conversationId != null,
  });
}

