import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";
import { MessageInput } from "../ui/MessageInput";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import { useGetConversation } from "../hooks/useGetConversation";
import { useUsers } from "../hooks/useUsers";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";
import { type SocketEvent } from "../types/socketEvent";
import { ConversationColorThemeFactory } from "../ui/ColorThemes/ConversationColorThemeFactory";
import { useGetUserConversations } from "../hooks/useGetUserConversationst";

export const Conversations = () => {
  const { currentUser } = useAuth();
  const { data: userconversations } = useGetUserConversations();
  const [conversationId, setConversationId] = useState<number | undefined>(
    undefined
  );
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate: sendMessage } = useSendMessage();
  const { data: users } = useUsers();
  const userMap = new Map(users?.map((u) => [u.id, u.username]));

  // const conversationThemeId = currentConversation?.themeId ?? 1; // First hardcoded null → default = 1
  const theme = ConversationColorThemeFactory.createTheme(2); //OBS fra User.ColorTheme

  const endRef = useRef<HTMLDivElement>(null);
  const {
    data: messages,
    isPending,
    error,
  } = useGetConversation(conversationId);

  // useSocket<SocketEvent>((event) => {
  //   if (event.type === "NEW_MESSAGE") {
  //     queryClient.invalidateQueries({
  //       queryKey: ["conversation", event.payload.conversationId],
  //     });
  //   }
  // });
  //todo temporary polling solution
  useEffect(() => {
    if (conversationId == null) return;

    const interval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
    }, 1000); // poll every 1 second

    return () => clearInterval(interval);
  }, [conversationId, queryClient]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (conversationId != null && isPending) return <SpinnerWithText />;
  if (error) return <p>Something went wrong loading messages.</p>;

  return (
    <div className="grid grid-cols-[20%_80%]" style={{ height: "80vh" }}>
      {/* Left column: conversation list */}
      <div>
        <div className="bg-blue-100 p-4 flex flex-col h-[75vh] overflow-y-auto">
          <Title>Mine samtaler</Title>

          {userconversations?.map((conversation) => (
            <Button
              key={conversation.conversationId}
              onClick={() => setConversationId(conversation.conversationId)}
              className="bg-blue-300 text-white mb-2"
            >
              {conversation.name ??
                `Conversation ${conversation.conversationId}`}
            </Button>
          ))}
        </div>
        <Button className="bg-blue-300 text-white mb-2">
          Opret en samtale
        </Button>
      </div>
      {/* Right column: messages + input */}
      {conversationId == null ? (
        <div className="flex items-center justify-center text-gray-500">
          Vælg en samtale i venstre side eller opret ny samtale.
        </div>
      ) : (
        <div className={`grid grid-rows-[1fr_auto] ${theme.conversationsBg}`}>
          <div className="overflow-y-auto p-4" style={{ height: "75vh" }}>
            {messages?.map((msg) => (
              <ChatBubble
                key={msg.id}
                isSender={msg.senderId === currentUser?.userId}
                sender={
                  currentUser?.userId === msg.senderId
                    ? currentUser?.userName
                    : userMap.get(msg.senderId) ?? "Unknown sender"
                }
                timestamp={msg.sentAt}
                messageId={msg.id}
                colorTheme={theme}
              >
                {msg.content}
              </ChatBubble>
            ))}
            <div ref={endRef} />
          </div>

          <MessageInput
            colorTheme={theme}
            content={content}
            setContent={setContent}
            onSubmit={() => {
              if (!currentUser) return;
              sendMessage({
                conversationId,
                userId: currentUser.userId,
                content,
              });
              setContent("");
            }}
          />
        </div>
      )}
    </div>
  );
};
