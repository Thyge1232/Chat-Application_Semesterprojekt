import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConversationColorThemeApi } from "../../../api/apiConversations";

export function useUpdateConversationColorTheme() {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    unknown,
    { conversationId: number; colorTheme: string }
  >({
    mutationFn: ({ conversationId, colorTheme }) =>
      updateConversationColorThemeApi(conversationId, colorTheme),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId],
      });
    },

    onError: (error: unknown) => {
      console.error("Fejl ved opdatering af samtalens farvetema:", error);
    },
  });
}
