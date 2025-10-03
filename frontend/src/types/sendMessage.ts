import type { User } from "./user";

export type SendMessageRequest = {
  conversationId: number;
  userId: number;
  content: string;
};

export type SendMessageResponse = {
  messageId: string;
  messageContent: string;
  conversationId: number;
  timeStamp: string;
  userId: number;
  user: User;
};
