// import { AxiosError } from "axios";
// import { useApiQuery } from "../../../hooks/useApiQuery";
// import { messagesApi } from "../../../api/messageApi";
// import type { Message } from "../../../types/message";
// import { conversationApi } from "../../../api/conversationApi";

// export function useConversationColorTheme(conversationId?: number) {
//     return useApiQuery<number, AxiosError>(
//         ["conversationColorTheme", conversationColorThemeId ?? "none"],
//         () => conversationApi.getColorTheme(conversationId!),
//         { enabled: conversationId != null }
//     );
// }

// endpoint i conversationApi, response = await apiClient.get<>
