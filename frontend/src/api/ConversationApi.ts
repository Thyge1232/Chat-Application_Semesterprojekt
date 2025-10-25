import { getListFromBackend, createItemInBackend, updateItemInBackend} from "./baseCRUDApi";
import type {
  Conversation,
  ConversationSummary,
  CreateConversationDto,
} from "../types/conversation";
import { ENDPOINTS } from "../config/api";

export async function getListOfUserConversations(): Promise<ConversationSummary[]> {
  return await getListFromBackend<ConversationSummary>(
    ENDPOINTS.userConversations
  );
}
export async function createConversation(
  createConversationDto: CreateConversationDto
): Promise<Conversation> {
  return await createItemInBackend<CreateConversationDto, Conversation>(
    ENDPOINTS.createConversations,
    createConversationDto
  );
}

//vi håndterer det via en liste af messages i stedet i messageApi
// export async function getConversationById(
//   conversationId: number
// ): Promise<Conversation> {
//   return await getItemFromBackend<Conversation>(
//      `${ENDPOINTS.messages}/${conversationId}`,
//     conversationId
//   );
// }

//todo when backend opens up for updating conversations (i.e. remove or add users) we can implement this properly
// export async function updateConversation(
//   conversationId: number,
//   updateConversationDto: Partial<CreateConversationDto>
// ): Promise<Conversation> { return await updateItemInBackend<Partial<CreateConversationDto>, Conversation>(
//     ENDPOINTS.<her putter vi den rigtige endpoint for update af conversations>,
//     conversationId.toString(),
//     updateConversationDto
//   );
// }