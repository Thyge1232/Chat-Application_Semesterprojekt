import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, it, expect, Mock } from "vitest";
import { useUserConversations } from "../../../../src/features/conversations/hooks/useUserConversations";
import { getAllUserConversationsApi } from "../../../../src/api/apiConversations";

vi.mock("../../../../src/api/apiConversations", () => ({
  getAllUserConversationsApi: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);
describe("useUserConversations hook", () => {
  it("fetcher user samtalerne", async () => {
    (getAllUserConversationsApi as Mock).mockResolvedValue([
      { id: 1, name: "Test samtale" },
    ]);

    const { result } = renderHook(() => useUserConversations(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: 1, name: "Test samtale" }]);
  });
});
