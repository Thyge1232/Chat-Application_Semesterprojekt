import { useLogin } from "../../../../src/features/authentication/hooks/useLogin";
import * as authService from "../../../../src/features/authentication/services/authService";
import * as tokenService from "../../../../src/features/authentication/services/tokenService";
import { apiClient } from "../../../../src/api/apiClient";
import { describe, it, vi, expect, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act, waitFor } from "@testing-library/react";

//laver et api-kald,  mock dette request: username, password,  -> rigtig + forkert -> response
// rigtig , mocker token, kaldes setToken()
//return getCurrentUser

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLogin hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should login successfully with correct credentials", async () => {
    const mockToken = "mocked-token";
    const mockUser = { userId: 1, userName: "Alice" };

    vi.spyOn(apiClient, "post").mockResolvedValue({ data: mockToken });
    const setTokenSpy = vi.spyOn(tokenService, "setToken");
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(mockUser);

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.mutate({ username: "Alice", password: "password123" });
    });

    await waitFor(() => result.current.isSuccess);
    expect(setTokenSpy).toHaveBeenCalledWith(mockToken);
    expect(result.current.data).toEqual(mockUser);
  });

  it("Should handle login failure", async () => {
    const error = new Error("Invalid credentials");
    vi.spyOn(apiClient, "post").mockRejectedValue(error);

    const { result } = renderHook(() => useLogin(), { wrapper });

    act(() => {
      result.current.mutate({ username: "Alice", password: "wrong" });
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toEqual(error);
  });
});
