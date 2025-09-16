"use client";

import { joinChannel, initSocket } from "./services/socket-service";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { MessageService } from "./services/api/message-service";
import { useAuthStore } from "./store/auth";
import { Message } from "./types/message";

export default function ChatSetup() {
  const { account, isLoading: loading, logout } = useAuthStore();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = MessageService.listMessages(
    "73942e0f-7d55-4edb-a4f5-79f9c741a8e7",
  );

  const [allMessages, setAllMessages] = useState(messages || []);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState<_TSFixMe>(null);
  const [channelReady, setChannelReady] = useState(false);
  const [typingUsers, setTypingUsers] = useState<
    { id: string; first_name: string }[]
  >([]);

  let typingTimeout: NodeJS.Timeout;

  // Auto-scroll
  const scrollToBottomSmooth = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setAllMessages(messages || []);
  }, [messages]);

  useEffect(() => {
    scrollToBottomSmooth();
  }, [allMessages]);

  // Initialize socket & join channel
  useEffect(() => {
    if (!account) return;

    const socket = initSocket();

    joinChannel(`chat:73942e0f-7d55-4edb-a4f5-79f9c741a8e7`, (msg) => {
      setAllMessages((prev) => {
        const normalized = normalizeMessage(msg);
        if (!normalized) return prev;
        if (prev.some((m) => m.id === normalized.id)) return prev;
        return [...prev, normalized];
      });
    })
      .then((ch) => {
        setChannel(ch);
        setChannelReady(true);

        // @ts-ignore
        ch.on("typing", (payload) => {
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
  }, [account]);

  function normalizeMessage(msg: _TSFixMe) {
    const m = msg.data ?? msg;
    return {
      id: m.id,
      content: m.content ?? "",
      sender: m.sender ?? { id: "unknown", first_name: "Unknown" },
      inserted_at: m.inserted_at,
      read_at: m.read_at ?? null,
    };
  }

  // Send new message
  const sendMessage = () => {
    if (!channel || !channelReady) return;

    const tempMessage = {
      id: Math.random().toString(36).substring(2, 15),
      content: newMessage,
      sender: { id: account?.user.id, first_name: account?.user.first_name },
      inserted_at: new Date().toISOString(),
      read_at: null,
    };

    channel
      .push("new_message", { content: newMessage })
      // @ts-ignore
      .receive("ok", (resp) => console.log("Message sent successfully:", resp))
      // @ts-ignore
      .receive("error", (resp) =>
        console.error("Failed to send message:", resp),
      )
      .receive("timeout", () => console.error("Message send timed out"));
    // @ts-ignore
    setAllMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    handleTyping(false);
  };

  const handleTyping = (isTyping: boolean) => {
    if (!channel || channel.state !== "joined") return;
    channel.push("typing", { typing: isTyping });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    handleTyping(true);

    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => handleTyping(false), 1500);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen p-4">
      <p className="font-bold">Hi, {account?.user.first_name}</p>

      <button
        onClick={() => logout(() => router.push("/auth/login"))}
        className="mb-2"
      >
        Logout
      </button>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto space-y-2 mt-4"
      >
        {allMessages.map((message) => {
          const isSender = account?.user?.id === message?.sender?.id;
          return (
            <div
              key={message?.id}
              className={cn(
                "flex w-full",
                isSender ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-xs rounded-lg px-4 py-2",
                  isSender
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200 text-black",
                )}
              >
                <p>{message?.content}</p>
                <p className="mt-1 text-xs font-medium">
                  {message?.sender?.first_name}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      <div className="h-5 text-sm text-gray-500 mt-1">
        {typingUsers.length > 0 &&
          `${typingUsers.map((u) => u.first_name).join(", ")} is typing...`}
      </div>

      <div className="mt-2 flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 border rounded px-4 py-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          disabled={!channel || channel.state !== "joined"}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
