import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConversationColorTheme } from "../../../api/conversationApi";
import { ENDPOINTS } from "../../../config/api";

export function useUpdateConversationColorTheme() {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    unknown,
    { conversationId: number; colorTheme: string }
  >({
    mutationFn: ({ conversationId, colorTheme }) =>
      updateConversationColorTheme(conversationId, colorTheme),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.conversationById, variables.conversationId],
      });
    },

    onError: (error: unknown) => {
      console.error("Fejl ved opdatering af samtalens farvetema:", error);
    },
  });
}
