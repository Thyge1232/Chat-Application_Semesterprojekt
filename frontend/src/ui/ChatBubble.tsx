import "./ChatBubbleStyle.css";
import type { IColorThemeConversation } from "../types/iColorThemes";

export type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: Date;
  sender?: string;
  messageId?: number;
  conversationId?: number;
  handleDelete?: (messageId: number) => void;
  handleEdit?: (messageId: number) => void;
  colorTheme: IColorThemeConversation;
};

export const ChatBubble = ({
  isSender,
  children,
  timestamp,
  sender,
  colorTheme,
  messageId,
  handleDelete,
  handleEdit,
}: ChatBubbleProps) => {
  const bubbleClass = isSender
    ? `${colorTheme.bubbleSenderBg} ${colorTheme.bubbleSenderText} ml-auto max-w-[40%] p-2 rounded-xl shadow`
    : `${colorTheme.bubbleReceiverBg} ${colorTheme.bubbleReceiverText} mr-auto max-w-[40%] p-2 rounded-xl shadow`;

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
  const onDelete = () => {
    if (handleDelete && messageId !== undefined) {
      handleDelete(messageId);
    }
  };

  const onEdit = () => {
    if (handleEdit && messageId !== undefined) {
      handleEdit(messageId);
    }
  };

  return (
    <div className={bubbleClass}>
      <div className="chat-bubble__content">{children}</div>
      <div className="chat-bubble__meta">
        {sender} {formattedTime}
        <div className="chat-bubble__actions">
          <button onClick={onDelete}>
            <img src="/Images/delete_icon.png" alt="delete" />
          </button>

          <button
          // onClick={() => handleEdit(messageId)}
          >
            <img src="/Images/edit_icon.png" alt="edit" />
          </button>
        </div>
      </div>
    </div>
  );
};
