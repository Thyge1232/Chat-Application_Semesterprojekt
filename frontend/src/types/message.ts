import type { ConversationId } from "./conversation";
import type { User, UserId } from "./user";

export type MessageId = string;

export interface Message {
  id: MessageId;
  conversationId: ConversationId;
  sender: User;
  content: string;
  // attachments?!
  sentAt: Date;
  readBy: UserId[];
}
