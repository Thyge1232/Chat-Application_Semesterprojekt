import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";

export const Conversations = () => {
  const messages: ChatBubbleProps[] = [];
  return (
    <>
      <div className="flex flex-row flex-1 h-full ">
        {" "}
        <div className="w-[200px] h- bg-blue-100 p-4 overflow-y-auto">
          <p>Here u see list over many people</p>
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Title>Messages</Title>
          <ChatBubble isSender={true}>Hello</ChatBubble>
          <ChatBubble isSender={false}>Hello</ChatBubble>
          <ChatBubble isSender={true}>bye</ChatBubble>
        </div>
      </div>
    </>
  );
};
