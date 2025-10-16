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
