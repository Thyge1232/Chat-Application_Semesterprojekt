import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getListOfUserConversations } from "../../../api/conversationApi";
import type { ConversationSummary } from "../../../types/conversation";
import { ENDPOINTS } from "../../../config/api";

export function useGetUserConversations() {
  return useQuery<ConversationSummary[], AxiosError>({
    queryKey: [ENDPOINTS.userConversations],
    queryFn: () => getListOfUserConversations(),
    staleTime: 1000 * 30,
    retry: 1,
  });
}
