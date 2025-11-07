//Strategi: starter ved at teste services, så hooks og til sidst
//Først tokenService, da authServices er afhængig af denne

//Her testes authServices + tokenService
//mock backend svar

import { describe, expect, test, beforeEach, vi } from "vitest";
import {
  getToken,
  setToken,
  clearToken,
} from "../../../src/features/authentication/services/tokenService";

describe("tokenService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe("setToken", () => {
    beforeEach(() => {
      vi.spyOn(Storage.prototype, "setItem");
    });

    test("Spy on localStorage.setItem", () => {
      setToken("abc123");
      expect(localStorage.setItem).toHaveBeenCalledWith("auth_token", "abc123");
    });

    test("Saves token to localStorage", () => {
      setToken("abc123");
      expect(localStorage.getItem("auth_token")).toBe("abc123");
    });

    test("Clears token form localStorage when token is null", () => {
      setToken(null);
      expect(localStorage.getItem("auth_token")).toBe(null);
    });
  });

  describe("getToken", () => {
    test("Returns token from inMemoryToken if it exists", () => {
      setToken("aaa123");
      expect(getToken()).toBe("aaa123");
    });

    test("Returns null if inMemoryToken is null and localStorage is empty", () => {
      setToken(null);
      expect(getToken()).toBeNull();
    });

    test("Falls back to localStorage if inMemoryToken is null", () => {
      localStorage.setItem("auth_token", "storedToken");
      expect(getToken()).toBe("storedToken");
    });
  });

  describe("clearToken", () => {
    test("Clears both inMemoryToken and localStorage", () => {
      setToken("abc145");
      clearToken();
      expect(getToken()).toBe(null);
      expect(localStorage.getItem("auth_token")).toBeNull();
    });
  });
});
