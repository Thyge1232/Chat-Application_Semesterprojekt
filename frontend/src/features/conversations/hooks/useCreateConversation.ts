import { useQueryClient, useMutation } from "@tanstack/react-query";
import type {
  Conversation,
  CreateConversationDto,
} from "../types/conversation";
import { createConversationApi } from "../../../api/apiConversations";

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation<Conversation, unknown, CreateConversationDto>({
    mutationFn: (dto: CreateConversationDto) => createConversationApi(dto),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["conversations"] }),
    onError: (error) => {
      console.error("Error creating conversation:", error);
    },
  });
}
