import type {
  ApiMessage,
  Message,
  SendMessage,
} from "../features/messages/types/message";
import { transformMessageFromApi } from "../features/messages/services/transformMessageFromApi";
import { ENDPOINTS } from "../config/endpoints";
import {
  getItemFromBackend,
  createItemInBackend,
  updateItemInBackend,
  deleteItemFromBackend,
  getListFromBackend,
} from "./apiBaseCrud";

export async function getMessagesByConversationId(
  conversationId: number
): Promise<Message[]> {
  const apiMessages = await getListFromBackend<ApiMessage>(
    ENDPOINTS.messages.byConversation(conversationId)
  );
  return apiMessages.map(transformMessageFromApi);
}

export async function sendMessage(
  sendMessageDto: SendMessage
): Promise<Message> {
  const apiMessage = await createItemInBackend<SendMessage, ApiMessage>(
    ENDPOINTS.messages.create(),
    sendMessageDto
  );
  return transformMessageFromApi(apiMessage);
}

export async function updateMessage(
  messageId: number,
  content: string
): Promise<Message> {
  const apiMessage = await updateItemInBackend<string, ApiMessage>(
    ENDPOINTS.messages.byId(messageId),
    content
  );
  return transformMessageFromApi(apiMessage);
}

export async function deleteMessage(messageId: number): Promise<void> {
  await deleteItemFromBackend(ENDPOINTS.messages.byId(messageId));
}

export async function getMessageById(messageId: number): Promise<Message> {
  const apiMessage = await getItemFromBackend<ApiMessage>(
    ENDPOINTS.messages.byId(messageId)
  );
  return transformMessageFromApi(apiMessage);
}
