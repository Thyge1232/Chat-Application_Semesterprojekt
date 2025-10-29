import React, { useState } from "react";
import "./MessageInputStyle.css";
import type { IColorThemeConversation } from "../types/iColorThemes";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export interface MessageInputProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  colorTheme: IColorThemeConversation;
}

//Declared as a form so we can extend later (smilies, gifs, uploads, etc.)
export const MessageInput = ({
  content,
  setContent,
  onSubmit,
  colorTheme,
}: MessageInputProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        placeholder="skriv en besked her..."
        className={`${colorTheme.messageInputBg} ${colorTheme.messageInputText} w-full rounded-full p-5 text-lg focus:outline-none`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="relative z-20 mr-12">
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="px-2 py-1 border rounded text-sm"
        >
          🙂
        </button>
        {showPicker && (
          <div className="absolute bottom-12 right-0 z-30">
            <EmojiPicker
              onEmojiClick={(emojiData: EmojiClickData) => {
                setContent((prev) => prev + emojiData.emoji);
                setShowPicker(false);
              }}
              width={250}
              height={350}
            />
          </div>
        )}
      </div>
      <button
        className={`${colorTheme.inputSubmitBg} ${colorTheme.inputSubmitText} absolute right-0 top-0 h-full rounded-full px-4 cursor-pointer`}
        type="submit"
      >
        send
      </button>
    </form>
  );
};
