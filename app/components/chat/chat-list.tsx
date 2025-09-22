"use client";

import { formatTimestamp } from "@/app/helpers";
import { ChatService } from "@/app/services/api/chat-service";
import AppAvatar from "@/app/components/ui/custom/app-avatar";
import { LargeTitle } from "@/app/components/ui/custom/large-title";
import ChatListLoader from "../loaders/chat-list-loader";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Chat } from "@/app/types/chat";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/app/store/auth";
import { useChatStore } from "@/app/store/chat";

export default function ChatList({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { account } = useAuthStore();
  const { selectedChat, setSelectedChat } = useChatStore();

  const { data: chats, isLoading } = ChatService.listChats();

  function getOtherUser(chat: Chat) {
    if (!account) return chat.user2;
    return chat.user1.id === account.user.id ? chat.user2 : chat.user1;
  }

  function renderName(firstName: string, lastName: string) {
    if ((firstName + lastName).length > 12) {
      return firstName + " " + lastName.substring(0, 5) + "...";
    }
    return firstName + " " + lastName;
  }

  return (
    <div className={cn(sidebarOpen ? "pt-14 pl-3" : "")}>
      <LargeTitle
        text={`Chats (${chats?.length || 0})`}
        classNames="text-[20px]"
      />

      {isLoading ? (
        <ChatListLoader />
      ) : (
        <Fragment>
          {chats?.map((chat) => {
            const otherUser = getOtherUser(chat);

            return (
              <div
                onClick={() => {
                  setSelectedChat(chat);
                  setSidebarOpen(false);
                }}
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
                        <p className="font-medium">
                          {renderName(
                            otherUser.first_name,
                            otherUser.last_name,
                          )}
                        </p>
                        {chat.last_message ? (
                          <p className="text-grayish text-[13px]">
                            {chat.last_message.content}
                          </p>
                        ) : (
                          <p className="text-grayish italic text-[13px]">
                            No messages yet
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
