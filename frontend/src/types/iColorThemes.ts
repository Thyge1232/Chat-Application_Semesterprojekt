//To use in conversation colortheme
export interface IColorThemeConversation {
  //chatbubble  --tjek
  bubbleSenderBg: string;
  bubbleSenderText: string;
  bubbleReceiverBg: string;
  bubbleReceiverText: string;

  //Inputfelt
  messageInputBg: string;
  messageInputText: string;
  inputSubmitBg: string; //"send"-buttom
  inputSubmitText: string;

  conversationsBg: string; //Bg for conversations field

  //Left column
  titleColor: string; //<Title>  - OBS bruges endnu ikke i Conversations.tsx / Title component
  conversationBottomBg: string;
  conversationsBottomText: string;
  leftBg: string;
}
