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
  dropdownBg = "bg-white";
  dropdownText = "text-black";
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
  dropdownBg = "bg-gray-800";
  dropdownText = "text-white";
}

//Edgelord Theme
export class ThemeEdgeLord implements IColorThemeConversation {
  bubbleSenderBg = "bg-gray-800";
  bubbleSenderText = "text-red-600";
  bubbleReceiverBg = "bg-black";
  bubbleReceiverText = "text-green-300";

  messageInputBg = "bg-gray-200 hover:bg-gray-800";
  messageInputText = "text-red-800 hover:text-yellow-400";
  inputSubmitBg = "bg-red-800 hover:bg-red-700";
  inputSubmitText = "text-white";

  conversationsBg = "bg-pink-900/90";
  dropdownBg = "bg-gray-900/80";
  dropdownText = "text-orange-400";
}
