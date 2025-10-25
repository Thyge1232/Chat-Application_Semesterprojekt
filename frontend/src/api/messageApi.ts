import type {
  ApiMessage,
  Message,
  SendMessage,
  UpdateMessage,
} from "../types/message";
import { transformMessageFromApi } from "../services/transformMessageFromApi";
import { ENDPOINTS } from "../config/api";
import {
  getItemFromBackend,
  createItemInBackend,
  updateItemInBackend,
  deleteItemFromBackend,
  getListFromBackend,
} from "./baseCRUDApi";

export async function getMessagesByConversationId(
  conversationId: number
): Promise<Message[]> {
  const apiMessages = await getListFromBackend<ApiMessage>(
    `${ENDPOINTS.messages}/${conversationId}`
  );
  return apiMessages.map(transformMessageFromApi);
}

export async function sendMessage(
  sendMessageDto: SendMessage
): Promise<Message> {
  const apiMessage = await createItemInBackend<SendMessage, ApiMessage>(
    ENDPOINTS.messages,
    sendMessageDto
  );
  return transformMessageFromApi(apiMessage);
}

export async function updateMessage(
  messageId: number,
  updateMessageDto: UpdateMessage
): Promise<Message> {
  const apiMessage = await updateItemInBackend<UpdateMessage, ApiMessage>(
    `${ENDPOINTS.messages}/${messageId}`,
    messageId,
    updateMessageDto
  );
  return transformMessageFromApi(apiMessage);
}

export async function deleteMessage(messageId: number): Promise<void> {
  await deleteItemFromBackend(`${ENDPOINTS.messages}/${messageId}`, messageId);
}

export async function getMessageById(messageId: number): Promise<Message> {
  const apiMessage = await getItemFromBackend<ApiMessage>(
    `${ENDPOINTS.messages}/${messageId}`,
    messageId
  );
  return transformMessageFromApi(apiMessage);
}
