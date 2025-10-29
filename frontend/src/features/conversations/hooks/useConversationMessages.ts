import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getMessagesByConversationId } from "../../../api/apiMessages";
import type { Message } from "../../../types/message";

export function useConversationMessages(conversationId?: number) {
  return useQuery<Message[], AxiosError>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (conversationId == undefined) throw new Error("Fejl i conversationId");
      return getMessagesByConversationId(conversationId);
    },
    enabled: conversationId != null,
  });
}
