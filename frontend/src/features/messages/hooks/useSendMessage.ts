import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiMessage, Message, SendMessage } from "../../../types/message";
import { transformMessageFromApi } from "../../../services/transformMessageFromApi";
import { apiClient } from "../../../api/apiClient";
import { ENDPOINTS } from "../../../config/api";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessage>({
    mutationFn: async (message) => {
      const res = await apiClient.post<ApiMessage>(ENDPOINTS.messages, message);
      return transformMessageFromApi(res.data);
    },
    onSuccess: (_data, variables) => {
      //we invalidate the conversation to rebuild the messages on the page
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId],
      });
      //and also update the conversationslist to the left on our page
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
