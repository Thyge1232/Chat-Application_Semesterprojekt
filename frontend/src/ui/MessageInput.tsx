import React from "react";
import "./MessageInputStyle.css";
import type { IColorThemeConversation } from "../types/iColorThemes";

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
      <button
        className={`${colorTheme.inputSubmitBg} ${colorTheme.inputSubmitText} absolute right-0 top-0 h-full rounded-full px-4 cursor-pointer`}
        type="submit"
      >
        send
      </button>
    </form>
  );
};
