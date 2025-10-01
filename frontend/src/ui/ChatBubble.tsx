type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: string;
};

export const ChatBubble = ({ isSender = false, children }: ChatBubbleProps) => {
  const bubbleStyles = isSender
    ? "bg-blue-200 text-black ml-auto"
    : "bg-gray-200 text-black mr-auto";

  return (
    <div
      className={`max-w-[75%] px-4 py-2 my-2 rounded-xl shadow-md ${bubbleStyles} text-3xl font-semibold`}
    >
      {children}
    </div>
  );
};
