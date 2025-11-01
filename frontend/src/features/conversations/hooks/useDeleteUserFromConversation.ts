import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserFromConversationApi } from "../../../api/apiConversations";

export function useDeleteUserFromConversation() {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, { conversationId: number }>({
    mutationFn: ({ conversationId }) =>
      deleteUserFromConversationApi(conversationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId],
      });
    },

    onError: (error) => {
      console.error("Fejl ved at fjerne en bruger fra conversation:", error);
    },
  });
}
