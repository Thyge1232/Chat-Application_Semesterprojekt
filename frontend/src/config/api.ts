//here we register endpoints to have a centralised place to update/add if nescesary
export const API_BASE_URL = "https://api.venner.nu";

/**
 * List with our endpoints - gets updated over time.
 * 
 * @example

 * ```tsx
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
 * ```
 */
export const ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  messages: `${API_BASE_URL}/messages`,
  login: `${API_BASE_URL}/api/Auth/login`,
  createConversations: `${API_BASE_URL}/api/conversations`,
  userConversations: `${API_BASE_URL}/api/users/me/conversations`,
  socket: "wss://api.venner.nu/socket", //todo midlertidig websocket url
};
