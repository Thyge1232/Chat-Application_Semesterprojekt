import React from "react";
import "./MessageInputStyle.css";
import { messageInput } from "../types/messageInput";
//we will declare this as a form since we want to add mor things in the future
//i.e. smilies, gifs, image uploads etc
export const MessageInput = ({
  content,
  setContent,
  onSubmit,
}: messageInput & { onSubmit: () => void }) => {
  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="input"
        placeholder="skriv en besked her..."
        className="input__box"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required={true}
      />
      <button className="input__submit" type="submit">
        send
      </button>
    </form>
  );
};
