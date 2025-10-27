import { useQuery } from "@tanstack/react-query";
import type {
  Conversation,
  ConversationRaw,
} from "../../../types/conversation";
import { getItemFromBackend } from "../../../api/baseCRUDApi";
import { ENDPOINTS } from "../../../config/api";

export function useGetConversation(conversationId?: number) {
  return useQuery<Conversation>({
    queryKey: [ENDPOINTS.conversationById, conversationId],
    queryFn: async () => {
      if (conversationId == null) throw new Error("No conversationId");
      return getItemFromBackend<ConversationRaw>(
        ENDPOINTS.conversationById,
        conversationId
      ).then(
        (raw) =>
          ({
            conversationId: raw.id,
            name: raw.name,
            createdAt: new Date(raw.createdAt),
            participants: raw.members,
            colorTheme: raw.colorTheme,
          } as Conversation)
      );
    },
    enabled: conversationId != null,
  });
}
