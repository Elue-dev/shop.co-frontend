import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import client from "../client";
import { QUERY_KEYS } from "@/app/helpers/constants";
import { Chat } from "@/app/types/chat";
import { Message } from "@/app/types/message";

export const ChatService = {
  listChats: function (): UseQueryResult<Chat[]> {
    return useQuery<Chat[]>({
      queryKey: [QUERY_KEYS.CHATS],
      queryFn: async function () {
        const response = await client.get("/chats");
        return response.data;
      },
    });
  },

  createChat: function (): UseMutationResult<Chat, unknown, string, unknown> {
    return useMutation<Chat, unknown, string>({
      mutationFn: async (user2_id: string) => {
        const response = await client.post("/chats", { user2_id });
        return response.data;
      },
    });
  },

  listChatMessages: function (chat_id: string): UseQueryResult<Message[]> {
    return useQuery<Message[]>({
      queryKey: [QUERY_KEYS.CHATS, chat_id, QUERY_KEYS.MESSAGES],
      queryFn: async function () {
        const response = await client.get(`/chats/${chat_id}/messages`);
        return response.data;
      },
    });
  },
};
