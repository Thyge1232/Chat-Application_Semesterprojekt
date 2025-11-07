import { describe, expect, test, beforeEach, vi, afterEach } from "vitest";
import {
  getCurrentUser,
  type CurrentUser,
} from "../../../src/features/authentication/services/authService";
import * as tokenService from "../../../src/features/authentication/services/tokenService";

describe("authService", () => {
  let getTokenSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    getTokenSpy = vi.spyOn(tokenService, "getToken");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getCurrentUser", () => {
    const invalidTokens = [
      "header..signature",
      "header.hh.signature",
      "header.null.signature",
      "",
      "header",
    ];

    test.each(invalidTokens)("returns null for invalidTokens '%s'", (token) => {
      getTokenSpy.mockReturnValue(token);
      expect(getCurrentUser()).toBeNull();
    });
  });

  const invalidPayloads: [Record<string, unknown>, string][] = [
    [{ nameid: 1 }, "userName missing"],
    [{ unique_name: "Alice" }, "userId missing"],
    [{ unique_name: "Alice", nameid: null }, "userId null"],
    [{ unique_name: "", nameid: 5 }, "userName empty"],
  ];

  test.each(invalidPayloads)(
    "returns null if payload is incomplete: %s (%s)",
    (payload, _) => {
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      getTokenSpy.mockReturnValue(token);
      expect(getCurrentUser()).toBeNull();
    }
  );

  const validPayloads: Record<string, unknown>[] = [
    { nameid: 1, unique_name: "Alice" },
    { unique_name: "Jens", nameid: 5 },
  ];

  test.each(validPayloads)(
    "returns CurrentUser for valid payload: %o",
    (payload) => {
      const token = `header.${btoa(JSON.stringify(payload))}.signature`;
      getTokenSpy.mockReturnValue(token);
      const user = getCurrentUser();
      expect(user).toEqual({
        userId: Number(payload.nameid),
        userName: String(payload.unique_name),
      });
    }
  );
});
