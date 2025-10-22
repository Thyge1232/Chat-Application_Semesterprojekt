//here we register endpoints to have a centralised place to update/add if nescesary
export const API_BASE_URL = "https://api.venner.nu";

export const ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  messages: `${API_BASE_URL}/messages`,
  login: `${API_BASE_URL}/api/Auth/login`,
  conversations: `${API_BASE_URL}/api/conversations`,
  socket: "wss://api.venner.nu/socket", //todo midlertidig websocket url
};
