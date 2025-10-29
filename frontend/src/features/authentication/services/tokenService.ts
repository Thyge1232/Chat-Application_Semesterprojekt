export type Token = string | null;

let inMemoryToken: Token = null;

export function getToken(): Token {
  if (inMemoryToken) return inMemoryToken;
  const t = localStorage.getItem("auth_token");
  inMemoryToken = t;
  return t;
}

export function setToken(token: string | null) {
  inMemoryToken = token;
  if (token === null) localStorage.removeItem("auth_token");
  else localStorage.setItem("auth_token", token);
}

export function clearToken() {
  setToken(null);
}
