import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";
import React, { use, useState } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import type { ApiMessage, Message as AppMessage } from "../types/message";
import { useGetConversation } from "../hooks/useGetConversation";
import { MessageInput } from "../ui/MessageInput";
import { getCurrentUserFromToken } from "../utils/validation";

//todo some implementation of aquiring userid at login and use it here
const userId = 6;
const senderId = "Mantequilla";
const conversationId = 1;

const currentUser = getCurrentUserFromToken();
export const Conversations = () => {
  const { mutate: sendMessage } = useSendMessage();
  const [content, setContent] = useState<string>("");

  const { data, isLoading, error } = useGetConversation();
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading conversations</p>
    );

  console.log(content);

  return (
    <div className="grid grid-cols-[20%_80%]" style={{ height: "80vh" }}>
      {/* Left Sidebar */}
      <div className="bg-blue-100 p-4 overflow-y-auto">
        <p>Here u see list over many people</p>
      </div>

      {/* Right Chat Area */}
      <div className="grid grid-rows-[1fr_auto] bg-white">
        {/* Scrollable Messages */}
        <div className="overflow-y-auto p-4" style={{ height: "60vh" }}>
          <Title>Messages</Title>
          {data?.map((msg) => (
            <ChatBubble
              key={msg.id}
              isSender={msg.senderId == currentUser.userId}
              sender={
                currentUser.userId == msg.senderId
                  ? currentUser.userName
                  : "Mantequilla"
              }
              timestamp={msg.sentAt}
              messageId={msg.id}
            >
              {msg.content}
            </ChatBubble>
          ))}
        </div>
        <MessageInput
          content={content}
          setContent={setContent}
          onSubmit={() => {
            sendMessage({
              conversationId: 1,
              userId: userId,
              content: content,
            });
            setContent("");
          }}
        />
      </div>
    </div>
  );
};
