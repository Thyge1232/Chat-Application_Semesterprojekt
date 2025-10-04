import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";
import { useState } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import { useGetConversation } from "../hooks/useGetConversation";
import { MessageInput } from "../ui/MessageInput";
import { getCurrentUserFromToken } from "../utils/validation";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";

const userId = 6;

//todo remove dummy current user, when backend team has implemented login feature
let currentUser = getCurrentUserFromToken();
if (!currentUser) currentUser = { userId: 1, userName: "Alice" };

export const Conversations = () => {
  const [conversationId, setConversationId] = useState<number>(1);
  const { mutate: sendMessage } = useSendMessage();
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGetConversation(conversationId);

  if (isLoading)
    return (
      <p>
        <SpinnerWithText />
      </p>
    );
  if (error) return <img src="/public/Images/Error.png" alt="error" />;

  console.log(content);

  return (
    <div className="grid grid-cols-[20%_80%]" style={{ height: "80vh" }}>
      {/* Left Sidebar */}
      <div className="bg-blue-100 p-4 overflow-y-auto">
        <Title>Conversations</Title>
        <Button
          onClick={() => {
            setConversationId(1);
            queryClient.invalidateQueries({
              queryKey: ["conversation", 1],
            });
          }}
        >
          Conversation 1
        </Button>

        <br />
        <br />
        <Button
          onClick={() => {
            setConversationId(2);
            queryClient.invalidateQueries({
              queryKey: ["conversation", 2],
            });
          }}
        >
          Conversation 2
        </Button>

        <br />
        <br />
        <Button
          onClick={() => {
            setConversationId(3);
            queryClient.invalidateQueries({
              queryKey: ["conversation", 3],
            });
          }}
        >
          Conversation 3
        </Button>
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
              conversationId,
              userId,
              content,
            });

            setContent("");
          }}
        />
      </div>
    </div>
  );
};
