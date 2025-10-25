import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../config/api";
import { deleteMessage } from "../../../api/messageApi";
import { getToken } from "../../../services/tokenService";

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { messageId: number; conversationId: number }
  >({
    mutationFn: async ({ messageId }) => {
      console.log("Deleting message with ID:", messageId);
      console.log(getToken());
      await deleteMessage(messageId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.messages, variables.conversationId],
      });
    },
  });
};
