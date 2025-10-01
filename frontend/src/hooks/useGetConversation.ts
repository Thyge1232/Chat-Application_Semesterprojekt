//på sigt skal vi have fat i bestemte conversation id... til at starte med bare fælles conversation

import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";
const apiUsersEndpoint = "/api/users";

export const useGetConversation = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(apiUsersEndpoint);
      if (!res.ok) throw new Error("Fejl ved opslag i databasen");
      return res.json();
    },
  });
};
