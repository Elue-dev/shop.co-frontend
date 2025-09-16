import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "../client";
import { Message } from "@/app/types/message";

export const MessageService = {
  listMessages: function (chat_id: string): UseQueryResult<Message[]> {
    return useQuery<Message[]>({
      queryKey: ["messages", chat_id],
      queryFn: async function () {
        const response = await client.get(`/chats/${chat_id}/messages`);
        return response.data;
      },
    });
  },

  sendMessage: async (chatId: string, message: string) => {
    return client.post(`/chats/message`, {
      chat_id: chatId,
      content: message,
    });
  },
};
