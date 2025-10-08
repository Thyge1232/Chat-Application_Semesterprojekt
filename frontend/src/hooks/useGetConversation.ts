import { useQuery } from "@tanstack/react-query";
import type { ApiMessage, Message } from "../types/message";
import { transformMessageFromApi } from "../services/transformMessageFromApi";
import { ENDPOINTS } from "../config/api";

export const useGetConversation = (conversationId: number) => {
  return useQuery<Message[]>({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await fetch(`${ENDPOINTS.messages}/${conversationId}`);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      const raw: ApiMessage[] = await res.json();
      return raw.map(transformMessageFromApi);
    },
  });
};
