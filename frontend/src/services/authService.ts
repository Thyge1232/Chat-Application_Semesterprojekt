import { getToken } from "./tokenService";

interface JwtPayload {
  nameid?: string | number;
  unique_name?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
}

export interface CurrentUser {
  userId: number;
  userName: string;
}

export function getCurrentUser(): CurrentUser | null {
  const token = getToken();
  if (!token) return null;

  const payloadPart = token.split(".")[1];
  if (!payloadPart) return null;

  try {
    const decoded: JwtPayload = JSON.parse(
      atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))
    );

    const rawId = decoded.nameid;
    const userId = rawId ? Number(rawId) : null;

    if (!userId || isNaN(userId)) {
      console.warn("Invalid userId in token", rawId);
      return null;
    }

    const userName = decoded.unique_name ?? "";
    if (!userName) {
      console.warn("Missing username in token");
      return null;
    }

    return { userId, userName };
  } catch (e) {
    console.warn("Failed to decode JWT", e);
    return null;
  }
}
