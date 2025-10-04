export type MessageId = number;

export type ApiMessage = {
  messageId?: number;
  conversationId: number;
  userId: number;
  messageContent: string;
  timeStamp: string;
};

export interface Message {
  id?: number;
  conversationId: number;
  senderId: number;
  content: string;
  sentAt: Date;
}

export type SendMessage = {
  conversationId: number;
  userId: number;
  content: string;
};
