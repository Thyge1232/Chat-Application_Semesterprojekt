import { API_BASE_URL } from "./apiUrl";

export const ENDPOINTS = {
  users: {
    all: () => `${API_BASE_URL}/users`,
    byId: (id: number | string) => `${API_BASE_URL}/users/${id}`,
    create: () => `${API_BASE_URL}/users`,
    meConversations: () => `${API_BASE_URL}/users/me/conversations`,
    updateColorTheme: () => `${API_BASE_URL}/users/me/colortheme`,
  },

  conversations: {
    byId: (id: number | string) => `${API_BASE_URL}/conversations/${id}`,
    create: () => `${API_BASE_URL}/conversations`,
    addUser: (conversationId: number | string, userId: number | string) =>
      `${API_BASE_URL}/conversations/${conversationId}/users/${userId}`,
    leave: (conversationId: number | string) =>
      `${API_BASE_URL}/conversations/${conversationId}/leave`,
  },

  messages: {
    all: () => `${API_BASE_URL}/messages`,
    byConversation: (conversationId: number | string) =>
      `${API_BASE_URL}/messages/${conversationId}`,
    byId: (id: number | string) => `${API_BASE_URL}/messages/${id}`,
    create: () => `${API_BASE_URL}/messages`,
    update: (messageId: number | string) =>
      `${API_BASE_URL}/messages/${messageId}`,
  },

  auth: {
    login: () => `${API_BASE_URL}/auth/login`,
  },

  // socket: () => `wss://api.venner.nu/socket`,
};
