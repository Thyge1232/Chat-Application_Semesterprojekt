import { useAuth } from "../../../../src/features/authentication/hooks/useAuth";
import * as authService from "../../../../src/features/authentication/services/authService";
import * as tokenService from "../../../../src/features/authentication/services/tokenService";
import { describe, expect, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return { ...actual, useNavigate: () => navigateMock };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("useAuth hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initialize with null user (not logged in)", () => {
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(null);
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.authChecked).toBe(true);
  });

  it("initializes with a valid user (logged ind", () => {
    const mockUser = { userId: 1, userName: "Alice" };
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(mockUser);
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.authChecked).toBe(true);
  });

  it("logout clears token, resets user and navigates", async () => {
    const mockUser = { userId: 2, userName: "Bob" };
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(mockUser);
    const clearTokenSpy = vi.spyOn(tokenService, "clearToken");
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.logout();
    });

    expect(clearTokenSpy).toHaveBeenCalledOnce();
    expect(result.current.currentUser).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith("/", { replace: true });
  });
});
