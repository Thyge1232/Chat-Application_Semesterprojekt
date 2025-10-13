//bare en generic hook til socket
import { useEffect } from "react";
import { socketService } from "../services/socketService";

export function useSocket<T>(onMessage: (data: T) => void) {
  useEffect(() => {
    socketService.connect((data: unknown) => {
      onMessage(data as T);
    });
    return () => socketService.disconnect();
  }, [onMessage]);
}
