import { axiosInstance } from "./axios";
import { createResourceApi } from "./baseCRUDApi";
import type { ApiMessage, Message, SendMessage } from "../types/message";
import { transformMessageFromApi } from "../services/transformMessageFromApi";

export const messagesApi = {
  ...createResourceApi<Message, SendMessage, Partial<SendMessage>>("/messages"),

  async getByConversation(conversationId: number): Promise<Message[]> {
    const res = await axiosInstance.get(`/messages/${conversationId}`);
    const raw = res.data as ApiMessage[];
    return raw.map(transformMessageFromApi);
  },
};
