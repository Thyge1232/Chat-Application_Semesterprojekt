import { useApiQuery } from "./useApiQuery";
import { ENDPOINTS } from "../config/api";
import type { Conversation, ConversationSummary } from "../types/conversation";
import { AxiosError } from "axios";
import { axiosInstance } from "../api/axios";

export function useGetUserConversations() {
  return useApiQuery<ConversationSummary[], AxiosError>(
    ["userconversations"],
    async () => {
      const res = await axiosInstance.get<ConversationSummary[]>(
        ENDPOINTS.userConversations
      );
      return res.data;
    }
  );
}
