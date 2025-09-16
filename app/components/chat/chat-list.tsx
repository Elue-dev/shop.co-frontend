"use client";

import { formatTimestamp } from "@/app/helpers";
import { ChatService } from "@/app/services/api/chat-service";
import AppAvatar from "@/app/components/ui/custom/app-avatar";
import { LargeTitle } from "@/app/components/ui/custom/large-title";
import ChatListLoader from "../loaders/chat-list-loader";
import { Fragment } from "react";
import { Chat } from "@/app/types/chat";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/app/store/auth";

interface ChatListProps {
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export default function ChatList({
  selectedChat,
  onSelectChat,
}: ChatListProps) {
  const { account } = useAuthStore();
  const { data: chats, isLoading } = ChatService.listChats();

  console.log({ chats });

  const getOtherUser = (chat: Chat) => {
    if (!account) return chat.user2;
    return chat.user1.id === account.user.id ? chat.user2 : chat.user1;
  };

  return (
    <div className="">
      <LargeTitle text={`Chats (${chats?.length || 0})`} />

      {isLoading ? (
        <ChatListLoader />
      ) : (
        <Fragment>
          {chats?.map((chat) => {
            const otherUser = getOtherUser(chat);

            return (
              <div
                onClick={() => onSelectChat(chat)}
                key={chat.id}
                className="cursor-pointer"
              >
                <div className="mt-4 mr-4">
                  <div
                    className={cn(
                      "flex justify-between items-start bg-[#f7f7f7] p-3 rounded-sm",
                      selectedChat?.id === chat.id &&
                        "border-[1px] border-black/50",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <AppAvatar
                        size="sm"
                        variant="dark"
                        name={`${otherUser.first_name} ${otherUser.last_name}`}
                      />

                      <div>
                        <p className="font-medium">{`${otherUser.first_name} ${otherUser.last_name}`}</p>
                        {chat.last_message && (
                          <p className="text-grayish">
                            {chat.last_message.content}
                          </p>
                        )}
                      </div>
                    </div>
                    {chat.last_message_at && (
                      <p className="text-[13px]">
                        {formatTimestamp(chat.last_message_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Fragment>
      )}
    </div>
  );
}
