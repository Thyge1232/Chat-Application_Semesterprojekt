//på sigt skal vi have fat i bestemte conversation id...
//  til at starte med bare fælles conversation
import { useQuery } from "@tanstack/react-query";
import type { ApiMessage, Message as AppMessage } from "../types/message";
import { transformMessageFromApi } from "../utils/transformMessageFromApi";

const apiConversationsEndpoint = "https://api.venner.nu/messages/1";

export const useGetConversation = () => {
  return useQuery<AppMessage[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(apiConversationsEndpoint);
      if (!res.ok) throw new Error("Fejl ved opslag i databas3en");
      const rawMessageScheme: ApiMessage[] = await res.json();
      return rawMessageScheme.map(transformMessageFromApi);
    },
  });
};
