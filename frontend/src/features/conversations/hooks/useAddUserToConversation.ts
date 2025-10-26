import { useMutation } from "@tanstack/react-query";
import type { Conversation } from "../../../types/conversation";
import { addUserToConversation } from "../../../api/conversationApi";

export function useAddUserToConversation() {
  return useMutation<
    Conversation,
    unknown,
    { conversationId: number; userId: number }
  >({
    mutationFn: ({ conversationId, userId }) =>
      addUserToConversation(conversationId, userId),
    onError: (error: unknown) => {
      console.error("Fejl ved tilføjelse af bruger til konversation:", error);
    },
  });
}
