import type { Message } from "./message";
import type { User } from "./user";

export type ConversationId = string;

export interface Conversation {
  id: ConversationId;
  participants: User[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}
