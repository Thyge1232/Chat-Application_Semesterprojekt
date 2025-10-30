import {
  getListFromBackend,
  createItemInBackend,
  updateItemInBackend,
} from "./apiBaseCrud";
import type {
  Conversation,
  ConversationSummary,
  CreateConversationDto,
} from "../features/conversations/types/conversation";
import { ENDPOINTS } from "../config/endpoints";
import { apiClient } from "./apiClient";

export async function getAllUserConversationsApi(): Promise<
  ConversationSummary[]
> {
  return await getListFromBackend<ConversationSummary>(
    ENDPOINTS.users.meConversations()
  );
}
export async function createConversationApi(
  createConversationDto: CreateConversationDto
): Promise<Conversation> {
  return await createItemInBackend<CreateConversationDto, Conversation>(
    ENDPOINTS.conversations.create(),
    createConversationDto
  );
}

export async function addUserToConversationApi(
  conversationId: number,
  userId: number
): Promise<void> {
  const url = `${ENDPOINTS.conversations.byId(conversationId)}/users/${userId}`;
  await apiClient.post(url);
}

export async function deleteUserFromConversationApi(
  conversationId: number
): Promise<void> {
  const url = `${ENDPOINTS.conversations.byId(conversationId)}/leave`;
  await apiClient.delete(url);
}

//Obs, når backend understøtter dette.
export async function updateConversationColorThemeApi(
  conversationId: number,
  colorTheme: string //number ??
): Promise<void> {
  return await updateItemInBackend<{ colorTheme: string }, void>(
    ENDPOINTS.conversations.byId(conversationId),
    { colorTheme }
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
