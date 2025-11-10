import {
  getListFromBackend,
  getItemFromBackend,
  createItemInBackend,
  updateItemInBackend,
  deleteItemFromBackend,
} from "../../src/api/apiBaseCrud";
import type { User } from "../../src/features/users/types/user";
import type { UpdateMessage } from "../../src/features/messages/types/message";
import { describe, test, expect, afterEach, beforeAll, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const users: User[] = [
  {
    id: 0,
    username: "Susanne",
    email: "susanne@test.com",
    createdAt: "02-05-2025",
  },
  { id: 1, username: "Hans", email: "Hans@test.com", createdAt: "02-12-2025" },
  {
    id: 10,
    username: "Hello",
    email: "Hello@test.com",
    createdAt: "17-05-2025",
  },
];

const singleUser: User = users[0];

const updatedMessage: UpdateMessage = {
  messageId: 123,
  content: "This is the new message",
};
const mockError = (
  method: "get" | "post" | "put" | "delete",
  url: string,
  status: number
) => {
  server.use(http[method](url, () => new HttpResponse(null, { status })));
};

// --- Handlers ---
const handlers = [
  // GET users list
  http.get("http://api/users", () => HttpResponse.json(users)),

  // GET single user
  http.get("http://api/users/1", () => HttpResponse.json(singleUser)),

  // POST new user
  http.post("http://api/users", async ({ request }) => {
    const body = (await request.json()) as Partial<User>;
    return HttpResponse.json<User>({
      id: 101,
      username: body.username ?? "Unknown",
      email: body.email ?? "unknown@email.com",
      createdAt: "10-11-2025",
    });
  }),

  // PUT update message
  http.put("http://api/messages/:messageId", async ({ params }) => {
    return HttpResponse.json<UpdateMessage>({
      messageId: Number(params.messageId),
      content: "This is the new message",
    });
  }),

  // DELETE message
  http.delete("http://api/messages/:messageId", ({ params }) => {
    return HttpResponse.json(
      `Message with id ${params.messageId} has been deleted`
    );
  }),
];

export const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getListFromBackEndtests", () => {
  test("getListFromBackEnd returns userlist succesfully", async () => {
    const response = await getListFromBackend("http://api/users");
    expect(response).toEqual(users);
  });
  test("getListFromBacked throws on 500 error", async () => {
    mockError("get", "http://api/users", 500);
    await expect(getListFromBackend("http://api/users")).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});

describe("getItemFromBackend", () => {
  test("getItemFromBackend returns a single user", async () => {
    const response = await getItemFromBackend("http://api/users/1");
    expect(response).toEqual(singleUser);
  });
  test("getItemFromBackend throws on 404", async () => {
    mockError("get", "http://api/users/1000", 404);
    await expect(getItemFromBackend("http://api/users/1000")).rejects.toThrow(
      "Request failed with status code 404"
    );
  });
});
describe("createItemInBackend", () => {
  test("createItemInBackend creates user successfully", async () => {
    const newUser = {
      username: "NewUser",
      email: "NewUser@mail.com",
    };
    const response = await createItemInBackend<typeof newUser, User>(
      "http://api/users",
      newUser
    );
    expect(response).toEqual({
      id: 101,
      username: "NewUser",
      email: "NewUser@mail.com",
      createdAt: "10-11-2025",
    });
  });
  test("createItemInBackend throws on invalid input", async () => {
    mockError("post", "http://api/users", 400);
    const invalidUser = {
      username: null,
      email: null,
    };
    await expect(
      createItemInBackend<typeof invalidUser, User>(
        "http://api/users",
        invalidUser
      )
    ).rejects.toThrow("Request failed with status code 400");
  });
});

describe("updateItemInBackend", () => {
  test("updateItemInBackend updates message succesfully", async () => {
    const response = await updateItemInBackend<
      typeof updatedMessage,
      UpdateMessage
    >("http://api/messages/123", updatedMessage);
    expect(response).toEqual({
      messageId: 123,
      content: "This is the new message",
    });
  });
  test("updateItemInBackend throws on empty content", async () => {
    mockError("put", "http://api/messages/123", 400);
    const invalidMessage = { content: "" };
    await expect(
      updateItemInBackend<typeof invalidMessage, UpdateMessage>(
        "http://api/messages/123",
        invalidMessage
      )
    ).rejects.toThrow("Request failed with status code 400");
  });
});

describe("deleteItemFromBackend", () => {
  test("deleteMessage deletes message successfully", async () => {
    await expect(
      deleteItemFromBackend("http://api/messages/7")
    ).resolves.toBeUndefined();
  });
  test("deleteMessage throws on 404", async () => {
    mockError("delete", "http://api/messages/999", 404);
    await expect(
      deleteItemFromBackend("http://api/messages/999")
    ).rejects.toThrow("Request failed with status code 404");
  });
});
