import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToConversation } from "../../../api/conversationApi";
import { ENDPOINTS } from "../../../config/api";

export function useAddUserToConversation() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { conversationId: number; userId: number }>(
    {
      mutationFn: ({ conversationId, userId }) =>
        addUserToConversation(conversationId, userId),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [ENDPOINTS.conversationById, variables.conversationId],
        });
      },

      onError: (error: unknown) => {
        console.error("Fejl ved tilføjelse af bruger til konversation:", error);
      },
    }
  );
}
