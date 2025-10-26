import type { UserSignup } from "../../../types/userSignup";
import { signupUser } from "../../../api/userAPi";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation<unknown, unknown, UserSignup>({
    mutationFn: (userData: UserSignup) => signupUser(userData),
  });
}
