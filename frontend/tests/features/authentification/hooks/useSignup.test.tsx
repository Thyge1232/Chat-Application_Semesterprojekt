import { useSignup } from "../../../../src/features/authentication/hooks/useSignup";
import { describe, it, vi, expect, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act, waitFor } from "@testing-library/react";
import type { CreateUserRequest } from "../../../../src/features/authentication/types/createUserRequest";
import * as apiUsers from "../../../../src/api/apiUsers";
import { MemoryRouter } from "react-router-dom";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return { ...actual, useNavigate: () => navigateMock };
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};
const mockCreateUserRequest = {
  username: "NewUser",
  email: "newUser@mail.com",
  password: "EtStrongPasword1!",
};

describe("useSignup hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    navigateMock.mockReset();
  });

  it("should create a new user successfully", async () => {
    vi.spyOn(apiUsers, "signupUser").mockResolvedValue(mockCreateUserRequest);

    const { result } = renderHook(() => useSignup(), { wrapper });

    act(() => {
      result.current.mutate(mockCreateUserRequest);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCreateUserRequest);
  });

  it("should navigate to /home when successed to create a user", async () => {
    vi.spyOn(apiUsers, "signupUser").mockResolvedValue(mockCreateUserRequest);

    const { result } = renderHook(() => useSignup(), { wrapper });

    act(() => {
      result.current.mutate(mockCreateUserRequest);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(navigateMock).toHaveBeenCalledWith("/home", { replace: true });
  });

  it("should not create a new user with null values", async () => {
    const error = new Error("Invalid information");
    vi.spyOn(apiUsers, "signupUser").mockRejectedValue(error);

    const { result } = renderHook(() => useSignup(), { wrapper });

    act(() => {
      result.current.mutate({ username: "Test", email: "", password: "" });
    });
    await waitFor(() => result.current.isError);
    expect(result.current.error).toEqual(error);
  });
});
