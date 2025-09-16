"use client";

import { useState } from "react";
import ChatList from "@/app/components/chat/chat-list";
import ChatDetails from "../components/chat/chat-details";
import { MessageSquareMore } from "lucide-react";
import { Chat } from "../types/chat";

export default function ChatsLayout() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="app-container mt-10 grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-80px)]">
      <aside className="border-r border-r-gray-100 md:col-span-1 overflow-y-auto">
        <ChatList
          selectedChat={selectedChat}
          onSelectChat={(chat) => setSelectedChat(chat)}
        />
      </aside>

      <main className="md:col-span-2 overflow-y-auto">
        {selectedChat ? (
          <ChatDetails chat={selectedChat} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <MessageSquareMore size={50} color="#333" />
            <h1 className="text-[16px] font-bold mt-2 mb-1">
              No chat selected
            </h1>
            <p className="text-gray-500">
              Select a chat to start messaging sellers!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
