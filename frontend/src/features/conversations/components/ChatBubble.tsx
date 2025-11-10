import type { IColorThemeConversation } from "../types/iColorThemes";
import { useState, useEffect } from "react";
import delete_icon from "../../../assets/images/delete_icon.png";
import edit_icon from "../../../assets/images/edit_icon.png";

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
    ? `${colorTheme.bubbleSenderBg} ${colorTheme.bubbleSenderText} ml-auto max-w-[40%] p-2 rounded-xl shadow my-2 font-semibold text-[1.5rem]`
    : `${colorTheme.bubbleReceiverBg} ${colorTheme.bubbleReceiverText} mr-auto max-w-[40%] p-2 rounded-xl shadow my-2 font-semibold text-[1.5rem]`;

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
    if (handleDelete && messageId !== undefined) handleDelete(messageId);
  };

  const onEdit = () => {
    if (handleEdit && messageId !== undefined)
      handleEdit(messageId, editedContent);
    setIsEditing(false);
  };

  return (
    <div className={bubbleClass} data-testid="chat-bubble">
      <div className="flex flex-col">
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

            <button
              type="button"
              onClick={onEdit}
              className="px-2 py-1 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
            >
              ✔
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
            >
              ✖
            </button>
          </div>
        ) : (
          children
        )}
      </div>

      <div className="text-[1rem] text-gray-600 mb-1 flex justify-between items-center">
        <span>
          {sender} {formattedTime}
        </span>

        {isSender && (
          <div className="flex gap-1 h-8 w-20">
            <button type="button" onClick={onDelete}>
              <img
                src={delete_icon}
                alt="delete"
                className="w-8 h-8 object-contain cursor-pointer"
              />
            </button>
            <button type="button" onClick={() => setIsEditing(true)}>
              <img
                src={edit_icon}
                alt="edit"
                className="w-8 h-8 object-contain cursor-pointer"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
