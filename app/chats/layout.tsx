"use client";

import ChatList from "@/app/components/chat/chat-list";
import { Menu, MessageSquareMore, X } from "lucide-react";
import ChatDetails from "../components/chat/chat-details";
import { useChatStore } from "../store/chat";
import { useState } from "react";

export default function ChatsLayout() {
  const { selectedChat } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container mt-10 grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-80px)]">
      <button
        className="md:hidden absolute top-4 left-2 z-20 p-2 rounded-lg bg-white shadow cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-10 w-80 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:relative md:translate-x-0 md:w-auto md:col-span-1 overflow-y-auto`}
      >
        <ChatList sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      <main className="md:col-span-2 overflow-y-auto">
        {selectedChat ? (
          <ChatDetails />
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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-5 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
