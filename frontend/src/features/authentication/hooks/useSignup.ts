import { signupUser } from "../../../api/apiUsers";
import { useMutation } from "@tanstack/react-query";
import { CreateUserRequest } from "../types/createUserRequest";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  return useMutation<unknown, unknown, CreateUserRequest>({
    mutationFn: (userData: CreateUserRequest) => signupUser(userData),
    onSuccess: () => navigate("/home", { replace: true }),
  });
}
