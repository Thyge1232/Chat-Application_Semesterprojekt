import { useAuth } from "../../../../src/features/authentication/hooks/useAuth";
import * as authService from "../../../../src/features/authentication/services/authService";
import { describe, expect, it, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("useAuth hook", () => {
  //   let getCurrentUserSpy: ReturnType<typeof vi.spyOn>;
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initialize with null user", () => {
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(null);
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.authChecked).toBe(true);
  });

  it("initializes with a valid user", () => {
    const mockUser = { userId: 1, userName: "Alice" };
    vi.spyOn(authService, "getCurrentUser").mockReturnValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.currentUser).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.authChecked).toBe(true);
  });
});
