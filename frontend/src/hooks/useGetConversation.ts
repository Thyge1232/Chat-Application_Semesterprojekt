//på sigt skal vi have fat i bestemte conversation id...
//  til at starte med bare fælles conversation
import { useQuery } from "@tanstack/react-query";
import type { ApiMessage, Message as AppMessage } from "../types/message";
import { transformMessageFromApi } from "../utils/transformMessageFromApi";

export const useGetConversation = (conversationId: number) => {
  return useQuery<AppMessage[]>({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await fetch(
        `https://api.venner.nu/messages/${conversationId}`
      );
      if (!res.ok) throw new Error("Fejl ved opslag i databas3en");
      const rawMessageScheme: ApiMessage[] = await res.json();
      return rawMessageScheme.map(transformMessageFromApi);
    },
  });
};
