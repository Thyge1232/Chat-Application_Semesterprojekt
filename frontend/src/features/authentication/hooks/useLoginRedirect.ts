import { useNavigate } from "react-router-dom";

export const useLoginRedirect = () => {
  const navigate = useNavigate();

  return () => {
    navigate("/login", { replace: true });
  };
};
