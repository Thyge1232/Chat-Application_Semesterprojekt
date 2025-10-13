import { ENDPOINTS } from "../config/api";
import { getToken } from "./tokenService";

type MessageHandler = (data: unknown) => void;

class SocketService {
  private socket: WebSocket | null = null;

  connect(onMessage: MessageHandler) {
    if (this.socket) return; // already connected

    this.socket = new WebSocket(`${ENDPOINTS.socket}?token=${getToken()}`);

    this.socket.onopen = () => console.log("🔌 WebSocket connected");
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    this.socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      this.socket = null;
    };
  }

  send(data: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected");
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}

export const socketService = new SocketService();
