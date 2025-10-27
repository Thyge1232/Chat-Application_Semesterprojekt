// src/tests/Conversations.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Conversations } from "../src/pages/Conversations";
import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";
import * as useAuthModule from "../src/features/authentication/hooks/useAuth";
import * as useGetUserConversationsModule from "../src/features/conversations/hooks/useGetUserConversations";
import type { ConversationSummary } from "../src/types/conversation";

vi.mock("../src/features/authentication/hooks/useAuth");
vi.mock("../src/features/conversations/hooks/useGetUserConversations");

type UnknownError = unknown;

/**
 * makeQueryResult returns a flexible mock for UseQueryResult.
 * It builds a plain object (Record<string, unknown>) and only casts
 * to UseQueryResult<T, unknown> at the end to avoid union-invariant errors.
 */
function makeQueryResult<T>(
  overrides: Partial<Record<string, unknown>> = {}
): UseQueryResult<T, UnknownError> {
  const base: Record<string, unknown> = {
    data: undefined,
    error: null,
    isLoading: false,
    isFetching: false,
    isError: false,
    isSuccess: false,
    status: "pending",
    refetch: vi.fn(),
    remove: vi.fn(),
    isFetched: false,
    isFetchedAfterMount: false,
    isRefetching: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    isPlaceholderData: false,
    isStale: true,
    isPaused: false,
  };

  return {
    ...(base as object),
    ...(overrides as object),
  } as unknown as UseQueryResult<T, UnknownError>;
}

describe("Conversations", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.spyOn(useAuthModule, "useAuth").mockReturnValue({
      currentUser: { userId: 1, userName: "TestUser" },
      isAuthenticated: true,
      authChecked: true,
      logout: vi.fn(),
    } as unknown as ReturnType<typeof useAuthModule.useAuth>);
  });

  it("renders loading state", () => {
    vi.spyOn(
      useGetUserConversationsModule,
      "useGetUserConversations"
    ).mockReturnValue(
      makeQueryResult<ConversationSummary[]>({
        isLoading: true,
        status: "pending",
      }) as unknown as ReturnType<
        typeof useGetUserConversationsModule.useGetUserConversations
      >
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Conversations />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders conversation list", async () => {
    const mockConversations: ConversationSummary[] = [
      { id: 1, name: "Conversation 1" } as ConversationSummary,
      { id: 2, name: "Conversation 2" } as ConversationSummary,
    ];

    vi.spyOn(
      useGetUserConversationsModule,
      "useGetUserConversations"
    ).mockReturnValue(
      makeQueryResult<ConversationSummary[]>({
        data: mockConversations,
        isSuccess: true,
        status: "success",
      }) as unknown as ReturnType<
        typeof useGetUserConversationsModule.useGetUserConversations
      >
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Conversations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Conversation 1")).toBeInTheDocument();
      expect(screen.getByText("Conversation 2")).toBeInTheDocument();
    });
  });

  it("shows empty state message when no conversations", async () => {
    vi.spyOn(
      useGetUserConversationsModule,
      "useGetUserConversations"
    ).mockReturnValue(
      makeQueryResult<ConversationSummary[]>({
        data: [],
        isSuccess: true,
        status: "success",
      }) as unknown as ReturnType<
        typeof useGetUserConversationsModule.useGetUserConversations
      >
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Conversations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Du har ikke nogen samtaler endnu/i)
      ).toBeInTheDocument();
    });
  });

  it("handles create conversation button click", async () => {
    vi.spyOn(
      useGetUserConversationsModule,
      "useGetUserConversations"
    ).mockReturnValue(
      makeQueryResult<ConversationSummary[]>({
        data: [],
        isSuccess: true,
        status: "success",
      }) as unknown as ReturnType<
        typeof useGetUserConversationsModule.useGetUserConversations
      >
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Conversations />
      </QueryClientProvider>
    );

    const createButton = screen.getByText(/Opret en samtale/i);
    fireEvent.click(createButton);

    expect(screen.getByPlaceholderText(/Navn på samtale/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    vi.spyOn(
      useGetUserConversationsModule,
      "useGetUserConversations"
    ).mockReturnValue(
      makeQueryResult<ConversationSummary[]>({
        data: undefined,
        isError: true,
        error: new Error("Test error"),
        status: "error",
      }) as unknown as ReturnType<
        typeof useGetUserConversationsModule.useGetUserConversations
      >
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Conversations />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Noget gik galt/i)).toBeInTheDocument();
  });
});
