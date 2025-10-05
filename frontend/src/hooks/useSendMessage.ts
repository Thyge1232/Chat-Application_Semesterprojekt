import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiMessage, SendMessage, Message } from "../types/message";
import { ENDPOINTS } from "../config/api";
import { transformMessageFromApi } from "../utils/transformMessageFromApi";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessage>({
    mutationFn: async (message) => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(ENDPOINTS.messages, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
      if (!res.ok)
        throw new Error("Fejl ved afsendelse af besked til databasen");
      const apiMsg: ApiMessage = await res.json();
      return transformMessageFromApi(apiMsg);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
