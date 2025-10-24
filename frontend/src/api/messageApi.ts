import { axiosInstance } from "./axios";
import { createResourceApi } from "./baseCRUDApi";
import type { ApiMessage, Message, SendMessage } from "../types/message";
import { transformMessageFromApi } from "../services/transformMessageFromApi";
import { ENDPOINTS } from "../config/api";

/**
 * Our messages api
 *
 * @examples
 * ```ts
 * import { messagesApi } from "../api/messagesApi";
 *
 * //list all messages
 * const messages = await messagesApi.list();
 *
 * //get a single message
 * const msg = await messagesApi.get("123");
 *
 * //create a new message
 * const newMsg = await messagesApi.create({
 *   conversationId: 1,
 *   text: "Hello world",
 * });
 *
 * //update a message
 * const updatedMsg = await messagesApi.update("123", {
 *   text: "Edited message",
 * });
 *
 * //remove a message
 * await messagesApi.remove("123");
 *
 * //get all messages for a conversation
 * const convoMessages = await messagesApi.getByConversation(1);
 * ```
 */

export const messagesApi = {
  ...createResourceApi<Message, SendMessage, Partial<SendMessage>>("/messages"),

  async getByConversation(conversationId: number): Promise<Message[]> {
    const res = await axiosInstance.get(
      `${ENDPOINTS.messages}/${conversationId}`
    );
    const raw = res.data as ApiMessage[];
    return raw.map(transformMessageFromApi);
  },
};
