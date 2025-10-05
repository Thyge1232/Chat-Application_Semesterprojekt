import React from "react";
import "./MessageInputStyle.css";

export interface MessageInputProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

//Declared as a form so we can extend later (smilies, gifs, uploads, etc.)
export const MessageInput = ({
  content,
  setContent,
  onSubmit,
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
        className="input__box"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="input__submit" type="submit">
        send
      </button>
    </form>
  );
};
