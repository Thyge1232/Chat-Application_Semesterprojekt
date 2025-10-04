export type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: Date;
  sender?: string;
  messageId?: number;
  conversationId?: number;
  handleDelete?: (messageId: number) => void;
  handleEdit?: (messageId: number) => void;
};
