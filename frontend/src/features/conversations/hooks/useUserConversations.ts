import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getAllUserConversationsApi } from "../../../api/apiConversations";
import type { ConversationSummary } from "../types/conversation";

export function useUserConversations() {
  return useQuery<ConversationSummary[], AxiosError>({
    queryKey: ["conversations"],
    queryFn: () => getAllUserConversationsApi(),
  });
}
