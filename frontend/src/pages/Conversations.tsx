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
import { getCurrentUserFromToken } from "../services/validation";

//todo remove dummy current user and dummy userId, when backend team has implemented login feature
let currentUser = getCurrentUserFromToken();
if (!currentUser) currentUser = { userId: 1, userName: "Alice" };

export const Conversations = () => {
  const [conversationId, setConversationId] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useSendMessage();
  const { data: users } = useUsers();
  const userMap = new Map(users?.map((u) => [u.id, u.username]));
  const endRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetConversation(conversationId);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
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
      {/* Left column with buttons to switch between conversations*/}
      <div className="bg-blue-100 p-4 overflow-y-auto">
        <Title>Conversations</Title>
        <Button
          onClick={() => {
            setConversationId(1);
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

      {/*Right column with the chatbubbles and inputfield*/}
      <div className="grid grid-rows-[1fr_auto] bg-white">
        {/*Message area - limited screen area with scrollable functionality*/}
        <div className="overflow-y-auto p-4" style={{ height: "75vh" }}>
          {data?.map((msg) => (
            <ChatBubble
              key={msg.id}
              isSender={msg.senderId == currentUser.userId}
              sender={
                currentUser.userId === msg.senderId
                  ? currentUser.userName
                  : userMap.get(msg.senderId) ?? "Ukendt afsender"
              }
              timestamp={msg.sentAt}
              messageId={msg.id}
            >
              {msg.content}
            </ChatBubble>
          ))}
          <div ref={endRef} />
        </div>
        <MessageInput
          content={content}
          setContent={setContent}
          onSubmit={() => {
            sendMessage({
              conversationId,
              userId: currentUser.userId,
              content,
            });
            setContent("");
          }}
        />
      </div>
    </div>
  );
};
