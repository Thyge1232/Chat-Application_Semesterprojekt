import { ChatBubble } from "../ui/ChatBubble";
import { Title } from "../ui/Title";
import { MessageInput } from "../ui/MessageInput";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Button } from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../features/authentication/hooks/useAuth";
// import { type SocketEvent } from "../types/socketEvent";
import { ConversationColorThemeFactory } from "../ui/ColorThemes/ConversationColorThemeFactory";
import { Dropdown, type DropdownItem } from "../ui/Dropdown";
import { useCreateConversation } from "../features/conversations/hooks/useCreateConversation";
import { AxiosError } from "axios";
import { useUsers } from "../features/users/hooks/useUsers";
import { useSendMessage } from "../features/messages/hooks/useSendMessage";
import { useDeleteMessage } from "../features/messages/hooks/useDeleteMessage";
import { useEditMessage } from "../features/messages/hooks/useEditMessage";
import { useGetConversationMessages } from "../features/conversations/hooks/useGetConversationMessages";
import { useGetUserConversations } from "../features/conversations/hooks/useGetUserConversations";
import { useAddUserToConversation } from "../features/conversations/hooks/useAddUserToConversation";
import { useGetConversation } from "../features/conversations/hooks/useGetConversation";

export const Conversations = () => {
  //LOGIC PART OF THE COMPONENT
  const { currentUser } = useAuth();
  const {
    data: userconversations,
    isLoading: isLoadingConversations,
    error: conversationsError,
  } = useGetUserConversations();

  const [conversationId, setConversationId] = useState<number | undefined>(
    undefined
  );
  const [newConversationName, setNewConversationName] = useState("");

  const [showCreateField, setShowCreateField] = useState(false);
  const [content, setContent] = useState<string>("");
  const { mutate: createConversation } = useCreateConversation();
  const queryClient = useQueryClient();
  const { mutate: sendMessage } = useSendMessage();
  const { mutate: deleteMessage } = useDeleteMessage();
  const { mutate: editMessage } = useEditMessage();
  const { data: users } = useUsers();
  const userMap = new Map(users?.map((u) => [u.id, u.username]));

  const { data: conversation } = useGetConversation(conversationId);
  const conversationThemeId = conversationId ?? 1;
  const [conversationThemes, setConversationThemes] = useState<
    Record<number, number>
  >({});
  const currentThemeNumber = conversationThemes[conversationThemeId] ?? 1;
  const theme = ConversationColorThemeFactory.createTheme(currentThemeNumber);
  const updateThemeForConversation = (themeNumber: number) => {
    setConversationThemes((prev) => ({
      ...prev,
      [conversationThemeId]: themeNumber,
    }));
    // TODO: send til backend via Axios senere
    console.log(
      `Conversation ${conversationId} theme updated to ${themeNumber}`
    );
  };

  //DROPDOWN!!!
  const themeOptions = ConversationColorThemeFactory.getAvailableThemes();
  const participants = conversation?.participants ?? [];

  const otherUsers =
    users?.filter((u) => !participants.some((p) => p.id === u.id)) ?? [];

  const addUserMutation = useAddUserToConversation();

  const dropdownItems: DropdownItem[] = [
    {
      itemlabel: "Tilføj bruger",
      onClick: () => console.log("Tilføj bruger Conversation clicked"), //ToDO: pop up --> vælg bruger fra liste, giv backend besked
      subItems: otherUsers?.map((u) => ({
        id: u.id,
        itemlabel: u.username,
        onClick: () => {
          addUserMutation.mutate({
            conversationId: conversationId!,
            userId: u.id,
          });
          console.log(
            `Tilføj bruger ${
              u.username
            } til samtale ${conversationId}\nListe over nuværende deltagere: ${participants
              .map((p) => p.username)
              .join(", ")}`
          );
        },
      })),
    },
    {
      itemlabel: "Forlad samtalen",
      onClick: () => console.log("Forlad samtalen clicked"), //TODO: pop up, ja/nej --> giv backend besked
    },
    {
      itemlabel: "Vælg farvetema",
      subItems: themeOptions.map((t) => ({
        itemlabel: t.label,
        onClick: () => {
          updateThemeForConversation(t.id); //TodO: giv backend besked
        },
      })),
    },
  ];

  const endRef = useRef<HTMLDivElement>(null);
  const {
    data: messages,
    isPending,
    error,
  } = useGetConversationMessages(conversationId);
  if (error?.response?.status === 401)
    console.error("Adgang til samtale nægtet");

  // useSocket<SocketEvent>((event) => {
  //   if (event.type === "NEW_MESSAGE") {
  //     queryClient.invalidateQueries({
  //       queryKey: ["conversation", event.payload.conversationId],
  //     });
  //   }
  // });
  //todo temporary polling solution
  useEffect(() => {
    if (conversationId == null) return;
    const interval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
    }, 1000); //poll every 1 second
    return () => clearInterval(interval);
  }, [conversationId, queryClient]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (conversationId != null && isPending) return <SpinnerWithText />;
  if (error) return <p>Something went wrong loading messages.</p>;
  console.log(
    "Conversation IDs:",
    userconversations?.map((c) => c.id)
  );

  // VISUAL PART OF THE COMPONENT
  return (
    <div className="grid grid-cols-[20%_80%]" style={{ height: "80vh" }}>
      {/* Left column: conversation list */}
      <div>
        <div className="bg-blue-100 p-4 flex flex-col overflow-y-auto relative">
          <Title>Mine samtaler</Title>

          {isLoadingConversations && <SpinnerWithText />}

          {conversationsError && (
            <p className="text-red-500">
              {conversationsError instanceof AxiosError &&
              conversationsError.response?.status === 401
                ? "Du har ikke adgang til dette..."
                : "Noget gik galt, da vi prøvede at indhente samtalerne"}
            </p>
          )}

          {userconversations?.length === 0 && (
            <p className="text-gray-500">
              You don’t have any conversations yet. Create one below!
            </p>
          )}

          {userconversations?.map((conversation) => (
            <Button
              key={conversation.id}
              onClick={() => setConversationId(conversation.id)}
              className="bg-blue-300 text-white mb-2"
            >
              {conversation.name?.trim() || `Samtale nr. ${conversation.id}`}
            </Button>
          ))}
        </div>

        {showCreateField ? (
          <div className="flex flex-col gap-2 p-2">
            <input
              type="text"
              value={newConversationName}
              onChange={(e) => setNewConversationName(e.target.value)}
              placeholder="Navn på samtale"
              className="border rounded px-2 py-1"
            />
            <div className="flex gap-2">
              <Button
                className="bg-blue-300 text-white"
                onClick={() => {
                  if (!newConversationName.trim()) return;
                  createConversation(
                    { name: newConversationName.trim() },
                    {
                      onSuccess: (newConversation) => {
                        setConversationId(newConversation.conversationId);
                        setNewConversationName("");
                        setShowCreateField(false);
                      },
                    }
                  );
                }}
              >
                Opret
              </Button>
              <Button
                className="bg-gray-300 text-black"
                onClick={() => {
                  setNewConversationName("");
                  setShowCreateField(false);
                }}
              >
                Annuller
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="bg-blue-300 text-white mb-2"
            onClick={() => setShowCreateField(true)}
          >
            Opret en samtale
          </Button>
        )}
      </div>

      {/* Right column: messages + input */}
      {conversationId == null ? (
        <div className="flex items-center justify-center text-gray-500">
          Vælg en samtale i venstre side eller opret ny samtale.
        </div>
      ) : (
        <div
          className={`grid grid-rows-[1fr_auto] relative ${theme.conversationsBg}`}
        >
          <Dropdown
            label="Indstillinger"
            items={dropdownItems}
            className={`absolute top-2 right-2 ${theme.dropdownBg} ${theme.dropdownText}`}
            colorTheme={theme}
          />
          <div className="overflow-y-auto p-4" style={{ height: "75vh" }}>
            <Dropdown
              label="Indstillinger"
              items={dropdownItems}
              className={`absolute top-2 right-2 ${theme.dropdownBg} ${theme.dropdownText}`}
              colorTheme={theme}
            />
            <div className="mb-4 mt-14" />
            {messages?.map((msg) => (
              <ChatBubble
                key={msg.id}
                isSender={msg.senderId === currentUser?.userId}
                sender={
                  currentUser?.userId === msg.senderId
                    ? currentUser?.userName
                    : userMap.get(msg.senderId) ?? "Ukendt afsender"
                }
                timestamp={msg.sentAt}
                messageId={msg.id}
                conversationId={conversationId}
                handleDelete={(messageId: number) => {
                  deleteMessage({ messageId, conversationId });
                }}
                handleEdit={(messageId: number, newContent: string) => {
                  editMessage({ messageId, conversationId, newContent });
                }}
                colorTheme={theme}
              >
                {msg.content}
              </ChatBubble>
            ))}
            <div ref={endRef} />
          </div>

          <MessageInput
            colorTheme={theme}
            content={content}
            setContent={setContent}
            onSubmit={() => {
              if (!currentUser) return;
              sendMessage({
                conversationId,
                userId: currentUser.userId,
                content,
              });
              setContent("");
            }}
          />
        </div>
      )}
    </div>
  );
};
