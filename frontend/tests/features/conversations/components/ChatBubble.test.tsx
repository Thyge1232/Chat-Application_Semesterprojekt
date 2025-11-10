import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChatBubble } from "../../../../src/features/conversations/components/ChatBubble";
import { BrowserRouter } from "react-router-dom";
import { time } from "console";

describe("ChatBubble komponenten", () => {
  it("viser korrekt bobel, når afsender ikke er den bruger, der er logget ind.", () => {
    render(
      <BrowserRouter>
        <ChatBubble
          sender="test sender"
          isSender={false}
          timestamp={new Date("2024-01-01T12:00:00Z")}
          colorTheme={{
            bubbleSenderBg: "bg-blue-500",
            bubbleSenderText: "text-white",
            bubbleReceiverBg: "bg-gray-300",
            bubbleReceiverText: "text-black",
          }}
        >
          Test message
        </ChatBubble>
      </BrowserRouter>
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText(/test sender/)).toBeInTheDocument();
    expect(screen.getByTestId("chat-bubble")).toHaveClass(
      "bg-gray-300",
      "text-black"
    );
    expect(screen.getByText(/01\/01\/2024/)).toBeInTheDocument(); // flexible date check
  });

  it("viser korrekt beskedformatering, når afsender er nuværende bruger", () => {
    render(
      <BrowserRouter>
        <ChatBubble
          sender="current user"
          isSender={true}
          colorTheme={{
            bubbleSenderBg: "bg-blue-500",
            bubbleSenderText: "text-white",
            bubbleReceiverBg: "bg-gray-300",
            bubbleReceiverText: "text-black",
          }}
        >
          Test message 2
        </ChatBubble>
      </BrowserRouter>
    );
    const messageElement = screen.getByText("Test message 2");
    const senderElement = screen.getByText("current user");
    const bubbleElement = screen.getByTestId("chat-bubble");
    expect(messageElement).toBeInTheDocument();
    expect(senderElement).toBeInTheDocument();
    expect(bubbleElement).toHaveClass("bg-blue-500 text-white");
  });
});
