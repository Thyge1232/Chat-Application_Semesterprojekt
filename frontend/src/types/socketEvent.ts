//De events vi vil oplyses om: (vi kan udvide hvis det bliver relevant)
export type SocketEvent =
  | { type: "NEW_MESSAGE"; payload: { conversationId: number } }
  | { type: "NEW_USER"; payload: { userId: number } }
  | { type: "NEW_CONVERSATION"; payload: { conversationId: number } };
