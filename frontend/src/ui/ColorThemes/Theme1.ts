import type { IColorThemeConversation } from "../../types/iColorThemes";

//Blue
export class ThemeBlue implements IColorThemeConversation {
  bubbleSenderBg = "bg-blue-200";
  bubbleSenderText = "text-black";
  bubbleReceiverBg = "bg-gray-200";
  bubbleReceiverText = "text-black";

  messageInputBg = "bg-blue-100";
  messageInputText = "text-black";
  inputSubmitBg = "bg-blue-500";
  inputSubmitText = "text-white";

  conversationsBg = "bg-blue-50";

  titleColor = "text-blue-800";
  conversationBottomBg = "bg-blue-300";
  conversationsBottomText = "text-white";
  leftBg = "bg-blue-100";
}

//DarkMode -- RET
export class ThemeDarkMode implements IColorThemeConversation {
  bubbleSenderBg = "bg-indigo-700";
  bubbleSenderText = "text-white";
  bubbleReceiverBg = "bg-gray-700";
  bubbleReceiverText = "text-gray-100";

  messageInputBg = "bg-gray-800";
  messageInputText = "text-gray-100";
  inputSubmitBg = "bg-indigo-600 hover:bg-indigo-500";
  inputSubmitText = "text-white";

  conversationsBg = "bg-gray-900";

  titleColor = "text-white";
  conversationBottomBg = "bg-gray-800";
  conversationsBottomText = "text-gray-100";
  leftBg = "bg-gray-950";
}
