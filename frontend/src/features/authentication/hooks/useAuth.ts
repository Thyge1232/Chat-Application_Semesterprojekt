import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../services/tokenService";
import { getCurrentUser } from "../services/authService";

export function useAuth() {
  const [currentUser, setCurrentUser] =
    useState<ReturnType<typeof getCurrentUser>>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setAuthChecked(true);
  }, []);

  const isAuthenticated = !!currentUser;

  const logout = useCallback(() => {
    clearToken();
    setCurrentUser(null);
    navigate("/", { replace: true });
  }, [navigate]);

  return {
    currentUser,
    isAuthenticated,
    authChecked,
    logout,
  };
}
