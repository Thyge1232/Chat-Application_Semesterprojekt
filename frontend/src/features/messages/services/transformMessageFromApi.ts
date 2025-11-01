import type { Message as AppMessage, ApiMessage } from "../types/message";

export const transformMessageFromApi = (message: ApiMessage): AppMessage => {
  return {
    id: message.messageId,
    conversationId: message.conversationId,
    senderId: message.userId,
    content: message.messageContent,
    sentAt: new Date(message.timeStamp),
  };
};
