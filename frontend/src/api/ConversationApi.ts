import { createResourceApi } from "./baseCRUDApi";
import type {
  Conversation,
  CreateConversationDto,
} from "../types/conversation";
import { ENDPOINTS } from "../config/api";

/**
 * Our conversation api
 *
 * @examples
 * ```ts
 * import { conversationApi } from "../api/conversationApi";
 *
 * //list all conversations
 * const conversations = await conversationApi.list();
 *
 * //get a single conversation
 * const convo = await conversationApi.get("123");
 *
 * //create a new conversation
 * const newConvo = await conversationApi.create({
 *   title: "Project kickoff",
 *   participants: ["u1", "u2"],
 * });
 *
 * //update a conversation
 * const updatedConvo = await conversationApi.update("123", {
 *   title: "Renamed project kickoff",
 * });
 *
 * //remove a conversation
 * await conversationApi.remove("123");
 * ```
 */

export const conversationApi = createResourceApi<
  Conversation,
  CreateConversationDto,
  Partial<CreateConversationDto>
>(ENDPOINTS.createConversations);
