import type { User } from "./user";

export type conversationId = number;

export interface Conversation {
  conversationId: number;
  name: string;
  createdAt: Date;
  participants: User[];
}
