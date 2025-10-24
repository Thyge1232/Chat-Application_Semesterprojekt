import { AxiosError } from "axios";
import { useApiQuery } from "../../../hooks/useApiQuery";
import type { ConversationSummary } from "../../../types/conversation";
import { ENDPOINTS } from "../../../config/api";
import { apiClient } from "../../../api/apiClient";

export function useGetUserConversations() {
  return useApiQuery<ConversationSummary[], AxiosError>(
    ["userconversations"],
    async () => {
      const res = await apiClient.get<ConversationSummary[]>(
        ENDPOINTS.userConversations
      );
      return res.data;
    }
  );
}
