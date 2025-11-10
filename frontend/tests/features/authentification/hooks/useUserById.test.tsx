import { describe, expect, test, afterEach, vi } from "vitest";
import { useUserById } from "../../../../src/features/authentication/hooks/useUserById";
import type { User } from "../../../../src/features/users/types/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import * as apiUsers from "../../../../src/api/apiUsers";

//getItemFromBackend  -- GET, return data¨
//useUserById -> getUserInfoById (apiUser) ->getItemFromBackend (apiBaseCrud)

//send invalid userID, validuser id,
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useUserById hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const mockUser: User = {
    id: 1,
    username: "Alice",
    email: "Alice@test.com",
    createdAt: "10-10-2025",
  };
  test("Get user by valid id", async () => {
    vi.spyOn(apiUsers, "getUserInfoById").mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUserById(1), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUser);
  });
  // test("invalid id triggers error state", async () => {
  //   vi.spyOn(apiUsers, "getUserInfoById").mockRejectedValue(
  //     new Error("User not found")
  //   );

  //   const { result } = renderHook(() => useUserById(99), { wrapper });

  //   await waitFor(() => result.current.isError);

  //   expect(result.current.data).toBeUndefined();
  //   // expect(result.current.error).toBeInstanceOf(Error);
  //   // expect(result.current.error?.message).toBe("User not found");
  // });
});
