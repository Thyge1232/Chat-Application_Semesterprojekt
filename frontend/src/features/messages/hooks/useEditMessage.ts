import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message, SendMessage } from "../../../types/message";
import { updateMessage } from "../../../api/messageApi";
import { ENDPOINTS } from "../../../config/api";

export const useEditMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<Message, Error, { messageId: number; newContent: string }>(
    {
      mutationFn: async ({ messageId, newContent }) => {
        const response = await updateMessage(messageId, newContent);
        return response;
      },
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [ENDPOINTS.messages, variables.messageId],
        });
      },
    }
  );
};
