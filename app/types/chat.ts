import { Channel } from "phoenix";
import { Account } from "./auth";
import { Message } from "./message";

export interface Chat {
  id: string;
  last_message: LastMessage;
  last_message_at: string;
  user1: ChatUser;
  user2: ChatUser;
}

interface LastMessage {
  content: string;
  id: string;
  read_at: string;
  sender_id: string;
}

interface ChatUser {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
}

export type TypingUser = {
  id: string;
  first_name: string;
};

export type TypingUsers = TypingUser[];

export interface ChatChannelOptions {
  account: Account | null;
  selectedChatId?: string;
  invalidateQueries: () => void;
  setSelectedChat: (chat: Chat) => void;
  setChannel: (ch: Channel) => void;
  setChannelReady: (ready: boolean) => void;
  setTypingUsers: React.Dispatch<React.SetStateAction<TypingUsers>>;
  setPendingMessages: React.Dispatch<React.SetStateAction<Set<string>>>;
  setAllMessages: React.Dispatch<React.SetStateAction<_TSFixMe[]>>;
}

export interface ChannelMessage {
  id: string;
  content: string;
  sender: Sender;
  inserted_at: string;
  read_at: string | null;
}

export interface ChannelMessageData {
  data: ChannelMessage;
}

export interface Sender {
  id: string;
  first_name: string;
}
