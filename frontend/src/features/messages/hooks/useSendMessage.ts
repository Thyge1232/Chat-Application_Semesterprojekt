import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message, SendMessage } from "../../../types/message";
import { sendMessage } from "../../../api/messageApi";
import { ENDPOINTS } from "../../../config/api";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessage>({
    mutationFn: async (message) => {
      const response = await sendMessage(message);
      return response;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.messages, variables.conversationId],
      });
    },
  });
};
