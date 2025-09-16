import { Chat } from "@/app/types/chat";
import { Separator } from "../ui/separator";
import { EllipsisVertical, MessageCircleMore, Send } from "lucide-react";
import { ChatService } from "@/app/services/api/chat-service";
import { useAuthStore } from "@/app/store/auth";
import {
  formatDateHeader,
  groupMessagesByDate,
  normalizeMessage,
} from "@/app/helpers/messages";
import { cn } from "@/lib/utils";
import AppAvatar from "../ui/custom/app-avatar";
import TextareaAutosize from "react-textarea-autosize";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/custom/button";
import { initSocket, joinChannel } from "@/app/services/socket-service";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/helpers/constants";

export default function ChatDetails({ chat }: { chat: Chat }) {
  const { account } = useAuthStore();
  const { data: messages } = ChatService.listChatMessages(chat.id);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [allMessages, setAllMessages] = useState(messages || []);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState<_TSFixMe>(null);
  const [channelReady, setChannelReady] = useState(false);
  const [typingUsers, setTypingUsers] = useState<
    { id: string; first_name: string }[]
  >([]);
  const queryClient = useQueryClient();
  let typingTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    setAllMessages(messages || []);
  }, [messages]);

  useEffect(() => {
    if (!account) return;

    initSocket();

    joinChannel(`chat:${chat.id}`, (msg) => {
      setAllMessages((prev) => {
        const normalized = normalizeMessage(msg);
        if (!normalized) return prev;
        if (prev.some((m) => m.id === normalized.id)) return prev;
        return [...prev, normalized];
      });
    })
      .then((ch: _TSFixMe) => {
        console.log({ ch });
        setChannel(ch);
        setChannelReady(true);

        ch.on("typing", (payload: _TSFixMe) => {
          setTypingUsers((prev) => {
            if (payload.typing) {
              if (!prev.some((u) => u.id === payload.user_id)) {
                return [
                  ...prev,
                  { id: payload.user_id, first_name: payload.first_name },
                ];
              }
            } else {
              return prev.filter((u) => u.id !== payload.user_id);
            }
            return prev;
          });
        });
      })
      .catch((err) => console.error("Channel join failed", err));
  }, [account, chat.id]);

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

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!channel || !channelReady) return;

    channel
      .push("new_message", { content: newMessage })
      .receive("ok", () => {
        queryClient.invalidateQueries([
          QUERY_KEYS.CHATS,
        ] as InvalidateQueryFilters);
        queryClient.invalidateQueries([
          QUERY_KEYS.CHATS,
          chat.id,
          QUERY_KEYS.MESSAGES,
        ] as InvalidateQueryFilters);
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

  const handleInputChange = (value: string) => {
    setNewMessage(value);
    handleTyping(true);

    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => handleTyping(false), 2500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pb-3 flex items-start justify-between">
        <div>
          <p className="font-semibold">{`${chat.user2.first_name} ${chat.user2.last_name}`}</p>
          <span className="text-grayish">{chat.user2.email}</span>
        </div>
        <EllipsisVertical />
      </div>
      <Separator />

      <div className="flex-1 overflow-y-auto px-3">
        <div ref={messagesContainerRef} className="flex flex-col mt-3 pb-4">
          {sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-4">
              <div className="flex justify-center mb-3">
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {formatDateHeader(dateKey)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {groupedMessages[dateKey].map((message) => {
                  const isCurrentUser = message.sender.id === account?.user.id;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-2",
                        isCurrentUser ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      <AppAvatar
                        size="xsm"
                        variant={isCurrentUser ? "light" : "dark"}
                        name={
                          isCurrentUser
                            ? `${chat.user1.first_name} ${chat.user1.last_name}`
                            : `${chat.user2.first_name} ${chat.user2.last_name}`
                        }
                      />
                      <div
                        className={cn(
                          "flex flex-col max-w-[70%]",
                          isCurrentUser ? "items-end" : "items-start",
                        )}
                      >
                        <div
                          className={cn(
                            "px-3 py-2 rounded-lg",
                            isCurrentUser
                              ? "bg-black/90 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-900 rounded-bl-sm",
                          )}
                        >
                          <span>{message.content}</span>
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
