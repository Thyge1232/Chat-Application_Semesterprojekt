import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../config/endpoints";
import { deleteMessage } from "../../../api/apiMessages";
import { getToken } from "../../authentication/services/tokenService";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};
