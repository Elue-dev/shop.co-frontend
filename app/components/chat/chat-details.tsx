import { QUERY_KEYS } from "@/app/helpers/constants";
import {
  formatDateHeader,
  groupMessagesByDate,
  normalizeMessage,
} from "@/app/helpers/messages";
import { ChatService } from "@/app/services/api/chat-service";
import { initSocket, joinChannel } from "@/app/services/socket-service";
import { useAuthStore } from "@/app/store/auth";
import { useChatStore } from "@/app/store/chat";
import { cn } from "@/lib/utils";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import {
  EllipsisVertical,
  MessageCircleMore,
  MessageSquareMore,
  MoreVertical,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import AppAvatar from "../ui/custom/app-avatar";
import { Button } from "../ui/custom/button";
import { Separator } from "../ui/separator";
import { actionToast, errorToast, successToast } from "../ui/custom/toast";
import { useRouter } from "next/navigation";
import MessagesLoader from "../loaders/messages-loader";
import { Chat, TypingUsers } from "@/app/types/chat";
import AppDropdown from "../ui/custom/app-dropdown";
import { useChatChannel } from "@/app/hooks/chat-channel";
import { Channel } from "phoenix";

export default function ChatDetails() {
  const { account } = useAuthStore();
  const { selectedChat, currentChatId, setSelectedChat } = useChatStore();
  const router = useRouter();
  const { data: messages, isLoading } = ChatService.listChatMessages(
    selectedChat?.id ?? currentChatId ?? "",
  );

  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [allMessages, setAllMessages] = useState(messages || []);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState<Channel>();
  const [channelReady, setChannelReady] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<Set<string>>(
    new Set(),
  );
  const [typingUsers, setTypingUsers] = useState<TypingUsers>([]);
  const queryClient = useQueryClient();
  let typingTimeout: NodeJS.Timeout;

  useChatChannel({
    account,
    selectedChatId: selectedChat?.id,
    invalidateQueries,
    setSelectedChat,
    setChannel,
    setChannelReady,
    setTypingUsers,
    setPendingMessages,
    setAllMessages,
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    setAllMessages(messages || []);
  }, [messages]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const groupedMessages = groupMessagesByDate(allMessages || []);
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  function invalidateQueries() {
    queryClient.invalidateQueries([QUERY_KEYS.CHATS] as InvalidateQueryFilters);
    queryClient.invalidateQueries([
      QUERY_KEYS.CHATS,
      selectedChat?.id,
      QUERY_KEYS.MESSAGES,
    ] as InvalidateQueryFilters);
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!channel || !channelReady) return;

    channel
      .push("new_message", { content: newMessage, chat_details: selectedChat })
      .receive("ok", () => {
        invalidateQueries();
      })
      .receive("error", (resp: _TSFixMe) =>
        console.error("Failed to send message:", resp),
      )
      .receive("timeout", () => console.error("Message send timed out"));
    setNewMessage("");
    handleTyping(false);
  };

  const handleTyping = (isTyping: boolean) => {
    if (!channel || channel.state !== "joined") return;
    channel.push("typing", { typing: isTyping });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      sendMessage();
    }
  };

  function handleInputChange(value: string) {
    setNewMessage(value);
    handleTyping(true);

    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => handleTyping(false), 4000);
  }

  function deleteMessage(messageId: string) {
    if (!channel || !channelReady) {
      errorToast({
        title: "Error",
        description: "Connection not ready. Please try again.",
      });
      return;
    }

    channel
      .push("delete_message", { message_id: messageId })
      .receive("ok", (response: _TSFixMe) => {
        console.log("Delete request sent:", response);
      })
      .receive("error", () => {
        errorToast({
          title: "Error",
          description: "Failed to send delete request",
        });
      })
      .receive("timeout", () => {
        errorToast({
          title: "Error",
          description: "Delete request timed out",
        });
      });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pb-3 flex items-start justify-between">
        <div>
          {selectedChat &&
            (() => {
              const isCurrentUser = selectedChat.user1.id === account?.user.id;
              const otherUser = isCurrentUser
                ? selectedChat.user2
                : selectedChat.user1;

              return (
                <>
                  <p className="font-semibold">
                    {`${otherUser.first_name} ${otherUser.last_name}`}
                  </p>
                  <span className="text-grayish">{otherUser.email}</span>
                </>
              );
            })()}
        </div>
        <EllipsisVertical />
      </div>
      <Separator />

      {isLoading && <MessagesLoader />}

      {!isLoading && allMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <MessageSquareMore size={30} color="#333" />
          <h1 className="text-[14px] font-bold mt-2 mb-1">No messages yet</h1>
          <p className="text-gray-500 text-[13px]">
            Send a message and start the conversation going!
          </p>
        </div>
      )}

      {!isLoading && allMessages.length > 0 && (
        <div className="flex-1 overflow-y-auto chat-scroll px-3">
          <div ref={messagesContainerRef} className="flex flex-col mt-3 pb-4">
            {sortedDates.map((dateKey) => (
              <div key={dateKey} className="mb-4">
                <div className="flex justify-center mb-3">
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                    {formatDateHeader(dateKey)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {groupedMessages[dateKey].map((message) => {
                    const isCurrentUser =
                      message.sender.id === account?.user.id;

                    const messageDropdownItems = [
                      {
                        label: "Delete message",
                        action: () => deleteMessage(message.id),
                      },
                    ];

                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex items-start gap-2 group",
                          isCurrentUser ? "flex-row-reverse" : "flex-row",
                        )}
                      >
                        <AppAvatar
                          size="xsm"
                          variant={isCurrentUser ? "light" : "dark"}
                          name={`${message.sender.first_name} ${message.sender.last_name}`}
                        />
                        <div
                          className={cn(
                            "flex flex-col max-w-[70%] relative",
                            isCurrentUser ? "items-end" : "items-start",
                          )}
                        >
                          {!message.is_deleted &&
                            !pendingMessages.has(message.id) &&
                            message.sender.id === account?.user.id && (
                              <div
                                className={cn(
                                  "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                                  isCurrentUser
                                    ? "left-0 -translate-x-8"
                                    : "right-0 translate-x-8",
                                )}
                              >
                                <AppDropdown items={messageDropdownItems}>
                                  <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                                </AppDropdown>
                              </div>
                            )}

                          <div
                            className={cn(
                              "px-3 py-2 rounded-lg",
                              isCurrentUser
                                ? "bg-black/90 text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-900 rounded-bl-sm",
                            )}
                          >
                            <span
                              className={cn(
                                message.is_deleted && "italic",
                                message.is_deleted
                                  ? isCurrentUser
                                    ? "text-gray-300"
                                    : "text-grayish"
                                  : "",
                              )}
                            >
                              {message.is_deleted
                                ? "This message was deleted"
                                : message.content}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 px-1">
                            {new Date(message.inserted_at).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="h-5 text-sm text-grayish mt-1 font-medium pl-4 mb-4">
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <MessageCircleMore size={16} />
            <p>
              {typingUsers.map((u) => u.first_name).join(", ")} is typing...
            </p>
          </div>
        )}
      </div>

      <div className="px-3 py-3 border-t bg-white">
        <div className="flex items-center justify-center gap-2">
          <div className="flex-1 relative">
            <TextareaAutosize
              value={newMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full resize-none rounded-lg border border-gray-200 py-4 mb-4 text-sm focus:outline-none pl-4 transition-all duration-30 ease-in-out"
              maxRows={4}
              minRows={1}
            />
          </div>

          {(isMobile || newMessage.trim()) && (
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              classNames="h-9 w-9 p-0 bg-black hover:bg-black/90 disabled:opacity-50"
            >
              <Send size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
