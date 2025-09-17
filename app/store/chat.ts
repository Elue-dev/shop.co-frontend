import { Chat } from "../types/chat";
import { create } from "zustand";

interface ChatState {
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  setCurrentChatId: (id) => set({ currentChatId: id }),
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
}));
