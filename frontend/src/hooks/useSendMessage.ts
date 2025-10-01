//på sigt skal vi have sende beskeder til bestemte conversation id... til at starte med bare fælles conversation
import { useMutation } from "@tanstack/react-query";
import { type User } from "../types/user";

const apiSendMsgEndpoint = "api/messages";

type SendMessageRequest = {
  conversationId: number;
  userId: number;
  content: string;
};

type SendMessageResponse = {
  messageId: string;
  messageContent: string;
  conversationId: number;
  timeStamp: string;
  userId: number;
  user: User;
};

export const useSendMessage = () => {
  useMutation<SendMessageResponse, Error, SendMessageRequest>({
    mutationFn: async ({ message }) => {
      const res = await fetch(apiSendMsgEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!res.ok)
        throw new Error("fejl ved afsendelse af besked til databasen");

      return res.json();
    },
  });
};
