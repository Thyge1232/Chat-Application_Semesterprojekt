import { useQuery } from "@tanstack/react-query";
import type {
  Conversation,
  ConversationRaw,
} from "../../../types/conversation";
import { getItemFromBackend } from "../../../api/apiBaseCrud";
import { ENDPOINTS } from "../../../config/endpoints";

export function useConversation(conversationId?: number) {
  return useQuery<Conversation>({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      if (conversationId == null) throw new Error("No conversationId");

      return getItemFromBackend<ConversationRaw>(
        ENDPOINTS.conversations.byId(conversationId)
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
