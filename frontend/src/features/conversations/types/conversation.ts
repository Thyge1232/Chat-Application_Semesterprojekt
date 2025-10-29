import type { User } from "../../users/types/user";

export type conversationId = number;

export interface Conversation {
  conversationId: number;
  name: string;
  createdAt: Date;
  participants: User[];
  colorTheme?: string;
}

export interface CreateConversationDto {
  name: string;
}

export interface UpdateConversationDto {
  name?: string;
}

export interface ConversationSummary {
  id: number;
  name: string | null;
}

export interface ConversationRaw {
  id: number;
  name: string;
  createdAt: string;
  members: User[];
  colorTheme?: string;
}
