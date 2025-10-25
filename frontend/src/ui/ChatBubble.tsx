import "./ChatBubbleStyle.css";
import type { IColorThemeConversation } from "../types/iColorThemes";
import { useState, useEffect } from "react";

export type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: Date;
  sender?: string;
  messageId?: number;
  conversationId?: number;
  handleDelete?: (messageId: number) => void;
  handleEdit?: (messageId: number, newContent: string) => void;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    children?.toString() ?? ""
  );

  useEffect(() => {
    setEditedContent(children?.toString() ?? "");
  }, [children]);

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
      handleEdit(messageId, editedContent);
    }
    setIsEditing(false);
  };

  return (
    <div className={bubbleClass}>
      <div className="chat-bubble__content">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onEdit();
                if (e.key === "Escape") setIsEditing(false);
              }}
              autoFocus
            />
            <button type="button" onClick={onEdit}>
              ✔
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              ✖
            </button>
          </div>
        ) : (
          children
        )}
      </div>
      <div className="chat-bubble__meta">
        {sender} {formattedTime}
        {isSender && (
          <div className="chat-bubble__actions">
            <button type="button" onClick={onDelete}>
              <img src="/Images/delete_icon.png" alt="delete" />
            </button>
            <button type="button" onClick={() => setIsEditing(true)}>
              <img src="/Images/edit_icon.png" alt="edit" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};