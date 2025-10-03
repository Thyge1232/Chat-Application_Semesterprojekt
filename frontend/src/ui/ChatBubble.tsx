import "./ChatBubbleStyle.css";
import { ChatBubbleProps } from "../types/chatBubble";

export const ChatBubble = ({
  isSender = false,
  children,
  timestamp,
  sender,
}: ChatBubbleProps) => {
  const bubbleClass = isSender
    ? "chat-bubble chat-bubble--sender"
    : "chat-bubble chat-bubble--receiver";

  return (
    <div className={bubbleClass}>
      <div className="chat-bubble__content">{children}</div>
      <div className="chat-bubble__meta">
        {sender} {timestamp}
      </div>
      <div className="chat-bubble__actions">
        <img src="/Images/delete_icon.png" alt="delete" />
        <img src="/Images/edit_icon.png" alt="edit" />
      </div>
    </div>
  );
};
