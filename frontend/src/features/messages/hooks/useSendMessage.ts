import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message, SendMessage } from "../../../types/message";
import { sendMessage } from "../../../api/apiMessages";
import { ENDPOINTS } from "../../../config/endpoints";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessage>({
    mutationFn: async (message) => {
      const response = await sendMessage(message);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};
