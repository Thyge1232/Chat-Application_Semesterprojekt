import { useApiQuery } from "./useApiQuery";
import { ENDPOINTS } from "../config/api";
import type { Conversation } from "../types/conversation";

export function useGetUserConversations() {
  return useApiQuery<Conversation[]>(["userconversations"], async () => {
    const res = await fetch(ENDPOINTS.userConversations);
    if (!res.ok) throw new Error("Failed to fetch user conversations");
    return res.json();
  });
}
