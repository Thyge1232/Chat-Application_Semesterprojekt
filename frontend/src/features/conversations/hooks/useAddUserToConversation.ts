import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToConversationApi } from "../../../api/apiConversations";
import { ENDPOINTS } from "../../../config/endpoints";

export function useAddUserToConversation() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { conversationId: number; userId: number }>(
    {
      mutationFn: ({ conversationId, userId }) =>
        addUserToConversationApi(conversationId, userId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["conversation", variables.conversationId],
        });
      },

      onError: (error) => {
        console.error("Fejl ved tilføjelse af bruger til konversation:", error);
      },
    }
  );
}
