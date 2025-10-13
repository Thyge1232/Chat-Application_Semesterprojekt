import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SpinnerWithText } from "../ui/SpinnerWithText";

type RequireAuthProps = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { currentUser, isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return <SpinnerWithText />;

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
