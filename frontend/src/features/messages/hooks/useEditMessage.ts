import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message } from "../types/message";
import { updateMessage } from "../../../api/apiMessages";
import { ENDPOINTS } from "../../../config/endpoints";

export const useEditMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message,
    Error,
    { messageId: number; conversationId: number; newContent: string }
  >({
    mutationFn: async ({ messageId, newContent }) => {
      const response = await updateMessage(messageId, newContent);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};
