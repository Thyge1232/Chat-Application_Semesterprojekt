//Her validerer vi inputs i.e. login- og registreringsform.
export const getCurrentUserFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  // JWTs are in three parts: header.payload.signature
  const payload = token.split(".")[1];
  if (!payload) return null;

  try {
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded.userId || decoded.sub, // depends on backend
      userName: decoded.username || decoded.unique_name,
    };
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
};
