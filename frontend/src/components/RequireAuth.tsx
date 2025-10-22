import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SpinnerWithText } from "../ui/SpinnerWithText";

type RequireAuthProps = {
  children: React.ReactNode;
};
/**
 * authentication guard
 *
 * @remarks
 * - wrapper for routes to check authentication
 * - redirects to login if not authenticated
 * - renders reactcomponents if authenticated
 *
 * @examples
 * ```tsx
 * import { RequireAuth } from "../components/RequireAuth";
 *
 * //protect a route
 * <Route
 *   path="/conversations"
 *   element={
 *     <RequireAuth>
 *       <Conversations />
 *     </RequireAuth>
 *   }
 * />
 * ```
 */

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { currentUser, isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return <SpinnerWithText />;

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
