import "./ChatBubbleStyle.css";

export type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: Date;
  sender?: string;
  messageId?: number;
  conversationId?: number;
  handleDelete?: (messageId: number) => void;
  handleEdit?: (messageId: number) => void;
};

export const ChatBubble = ({
  isSender,
  children,
  timestamp,
  sender,
  messageId,
  handleDelete,
  handleEdit,
}: ChatBubbleProps) => {
  const bubbleClass = isSender
    ? "chat-bubble chat-bubble--sender"
    : "chat-bubble chat-bubble--receiver";

  const formattedTime = timestamp
    ? timestamp.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <div className={bubbleClass}>
      <div className="chat-bubble__content">{children}</div>
      <div className="chat-bubble__meta">
        {sender} {formattedTime}
      </div>
      <div className="chat-bubble__actions">
        <button onClick={() => handleDelete(messageId)}>
          <img src="/Images/delete_icon.png" alt="delete" />
        </button>

        <button onClick={() => handleEdit(messageId)}>
          <img src="/Images/edit_icon.png" alt="edit" />
        </button>
      </div>
    </div>
  );
};
