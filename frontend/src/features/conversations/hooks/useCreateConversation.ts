import { useQueryClient, useMutation } from "@tanstack/react-query";
import type {
  Conversation,
  CreateConversationDto,
} from "../../../types/conversation";
import { createConversation } from "../../../api/conversationApi";
import { ENDPOINTS } from "../../../config/api";

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation<Conversation, unknown, CreateConversationDto>({
    mutationFn: (dto: CreateConversationDto) => createConversation(dto),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.userConversations],
      }),
    onError: (error: unknown) => {
      console.error("Error creating conversation:", error);
    },
    retry: 1,
  });
}
