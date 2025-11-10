import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MessageInput } from "../../../../src/features/conversations/components/MessageInput";
import { fireEvent } from "@testing-library/react";

describe("MessageInput component", () => {
  it("Rendrer MessageInput komponenten korrekt", () => {
    render(
      <MessageInput
        content=""
        setContent={() => {}}
        onSubmit={() => {}}
        colorTheme={{
          messageInputBg: "bg-white",
          messageInputText: "text-black",
          inputSubmitBg: "bg-blue-500",
          inputSubmitText: "text-white",
        }}
      />
    );
    const inputElement = screen.getByPlaceholderText("skriv en besked her...");
    const sendButton = screen.getByText("send");
    const emojiButton = screen.getByText("🙂");
    expect(inputElement).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(emojiButton).toBeInTheDocument();
  });
});
