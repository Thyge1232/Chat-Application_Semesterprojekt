//Only made a test for signupUser

import { signupUser } from "../../src/api/apiUsers";
import { describe, vi, expect, it } from "vitest";
import * as apiBaseCrud from "../../src/api/apiBaseCrud";

const mockUser = {
  username: "NewUser",
  email: "newUser@mail.com",
  password: "EtStrongPasword1!",
};

describe("Test signupUser", () => {
  it("is called with valid values", async () => {
    const mockResponse = { id: 1, ...mockUser };
    vi.spyOn(apiBaseCrud, "createItemInBackend").mockResolvedValue(
      mockResponse
    );

    const result = await signupUser(mockUser);

    expect(apiBaseCrud.createItemInBackend).toHaveBeenCalledWith(
      "https://api.venner.nu/api/users",
      mockUser
    );

    expect(result).toEqual(mockResponse);
  });

  it("is called with invalid values", async () => {
    const mockInvalidUser = { username: "", email: "", password: "" };

    const error = new Error("Invalid data");

    vi.spyOn(apiBaseCrud, "createItemInBackend").mockRejectedValue(error);

    await expect(signupUser(mockInvalidUser)).rejects.toThrow("Invalid data");
  });
});
