import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";
import React, { useState } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import type { Message as AppMessage } from "../types/message";
import type { Conversation } from "../types/conversation";
import { useGetConversation } from "../hooks/useGetConversation";
import { MessageInput } from "../ui/MessageInput";

//todo some implementation of aquiring userid at login and use it here
const userId = 6;
const senderId = "Mantequilla";

// Mock data before I establish the backend connection for this part
const mockMessages: AppMessage[] = [
  {
    id: "1",
    senderId: "Bobby",
    content: "Hello!",
    isSender: false,
    timestamp: "10:00:00",
  },
  {
    id: "2",
    senderId: "Mantequilla",
    content: "Hi there!",
    isSender: true,
    timestamp: "10:01:00",
  },
  {
    id: "3",
    senderId: "Bobby",
    content: "How are you?",
    isSender: false,
    timestamp: "10:02:00",
  },
  {
    id: "4",
    senderId: "Mantequilla",
    content: "I'm good, thanks!",
    isSender: true,
    timestamp: "10:03:00",
  },
  {
    id: "5",
    senderId: "Bobby",
    content: "What about you?",
    isSender: false,
    timestamp: "10:04:00",
  },
  {
    id: "6",
    senderId: "Mantequilla",
    content: "Doing well!",
    isSender: true,
    timestamp: "10:05:00",
  },
  {
    id: "7",
    senderId: "Bobby",
    content: "Great to hear!",
    isSender: false,
    timestamp: "10:06:00",
  },
  {
    id: "8",
    senderId: "Mantequilla",
    content: "Yes, indeed!",
    isSender: true,
    timestamp: "10:07:00",
  },
  {
    id: "9",
    senderId: "Bobby",
    content: "Let's catch up soon.",
    isSender: false,
    timestamp: "10:08:00",
  },
  {
    id: "10",
    senderId: "Mantequilla",
    content: "Absolutely!",
    isSender: true,
    timestamp: "10:09:00",
  },
  {
    id: "11",
    senderId: "Bobby",
    content: "See you later.",
    isSender: false,
    timestamp: "10:10:00",
  },
  {
    id: "12",
    senderId: "Mantequilla",
    content: "Bye!",
    isSender: true,
    timestamp: "10:11:00",
  },
  {
    id: "13",
    senderId: "Bobby",
    content: "Take care!",
    isSender: false,
    timestamp: "10:12:00",
  },
  {
    id: "14",
    senderId: "Mantequilla",
    content: "You too!",
    isSender: true,
    timestamp: "10:13:00",
  },
];
// const getConversation:Conversation[]=useGetConversation(id:number)

export const Conversations = () => {
  const { mutate: sendMessage } = useSendMessage();
  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<AppMessage[]>(mockMessages);

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
          {/* Map through mock messages and put sender + timestamp at the corner of the message in small font */}

          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              isSender={msg.isSender}
              sender={msg.senderId}
              timestamp={msg.timestamp}
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
            const newMessage: AppMessage = {
              id: String(messages.length + 1),
              senderId: senderId,
              content: content,
              isSender: true,
              timestamp: new Date().toLocaleTimeString(),
            };
            console.log("Before:", messages.length);
            setMessages((messages) => [...messages, newMessage]);
            console.log("After:", messages.length);
            setContent("");
          }}
        />
      </div>
    </div>
  );
};
