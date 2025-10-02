type ChatBubbleProps = {
  isSender?: boolean;
  children: React.ReactNode;
  timestamp?: string;
  sender?: string;
};

export const ChatBubble = ({
  isSender = false,
  children,
  timestamp,
  sender,
}: ChatBubbleProps) => {
  const bubbleStyles = isSender
    ? "bg-blue-200 text-black ml-auto"
    : "bg-gray-200 text-black mr-auto";

  return (
    <div
      className={`max-w-[40%] w-fit px-4 py-2 my-2 rounded-xl shadow-md ${bubbleStyles} text-3xl font-semibold`}
    >
      <div>{children}</div>
      <div className="text-xl text-gray-600 mb-1">
        {sender} {timestamp}
      </div>
      <div className="flex gap-0.3 flex-row h-10">
        <img src="/Images/delete_icon.png"></img>
        <img src="/Images/edit_icon.png"></img>
      </div>
    </div>
  );
};
