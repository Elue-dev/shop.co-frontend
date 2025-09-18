import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import client from "../client";
import { DeleteMessage, Message } from "@/app/types/message";
import { QUERY_KEYS } from "@/app/helpers/constants";

export const MessageService = {
  listMessages: function (chat_id: string): UseQueryResult<Message[]> {
    return useQuery<Message[]>({
      queryKey: [QUERY_KEYS.MESSAGES, chat_id],
      queryFn: async function () {
        const response = await client.get(`/chats/${chat_id}/messages`);
        return response.data;
      },
    });
  },
};
