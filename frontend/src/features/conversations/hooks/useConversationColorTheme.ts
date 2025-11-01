// import { AxiosError } from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { getConversationColorThemeApi } from "../../../api/apiConversations";
// import { ConversationColorThemeFactory } from "../types/ConversationColorThemeFactory";
// import type { IColorThemeConversation } from "../types/iColorThemes";

// export function useConversationColorTheme(conversationId?: number) {
//   return useQuery<IColorThemeConversation, AxiosError>({
//     queryKey: ["colorTheme", conversationId],
//     queryFn: async () => {
//       if (conversationId == null) throw new Error("Fejl i conversationId");

//       const themeName = await getConversationColorThemeApi(conversationId);

//       return ConversationColorThemeFactory.createThemeFromString(themeName);
//     },

//     enabled: conversationId != null,
//   });
// }

// // endpoint i conversationApi, response = await apiClient.get<>
