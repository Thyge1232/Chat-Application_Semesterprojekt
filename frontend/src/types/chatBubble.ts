export type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: string;
  sender?: string;
  messageId?: number;
};
