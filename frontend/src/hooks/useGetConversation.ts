//på sigt skal vi have fat i bestemte conversation id... til at starte med bare fælles conversation

import { useQuery } from "@tanstack/react-query";
import { Message as convMessage }  from "../types/message";
const apiConversationsEndpoint = "/api/messages";

export const useGetConversation = (conversationId:number) => {
  return useQuery = convMessage[]>({
    queryKey: [conversationId],
    queryFn: async () => {
      const res = await fetch(apiConversationsEndpoint);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      return res.json();
    },
  });
};
