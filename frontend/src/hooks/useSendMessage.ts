import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiMessage, SendMessage } from "../types/message";

const apiSendMsgEndpoint = "/api/messages";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiMessage, Error, SendMessage>({
    mutationFn: async (message) => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(apiSendMsgEndpoint, {
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
      return res.json();
    },
    onSuccess: () => {
      // Refresh conversation after sending
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
