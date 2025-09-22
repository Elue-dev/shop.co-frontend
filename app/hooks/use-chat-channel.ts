import { normalizeMessage } from "@/app/helpers/messages";
import { initSocket, joinChannel } from "@/app/services/socket-service";
import { useEffect } from "react";
import { actionToast, successToast } from "../components/ui/custom/toast";
import { ChannelMessageData, ChatChannelOptions } from "../types/chat";

export function useChatChannel({
  account,
  selectedChatId,
  invalidateQueries,
  setSelectedChat,
  setChannel,
  setChannelReady,
  setTypingUsers,
  setPendingMessages,
  setAllMessages,
}: ChatChannelOptions) {
  useEffect(() => {
    if (!account) return;
    if (!selectedChatId) return;

    initSocket();

    joinChannel(`chat:${selectedChatId}`, (msg: ChannelMessageData) => {
      invalidateQueries();

      if (msg.data.sender.id !== account.user.id) {
      }

      setPendingMessages((prev) => new Set(prev).add(msg.data.id));

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

        ch.on("message_confirmed", (payload) => {
          successToast({
            description: "confirmed in db",
          });
          setPendingMessages((prev) => {
            const newSet = new Set(prev);
            newSet.delete(payload.temp_id);
            return newSet;
          });

          setAllMessages((prev) =>
            prev.map((message) =>
              message.id === payload.temp_id
                ? { ...message, id: payload.real_id }
                : message,
            ),
          );
        });

        ch.on("message_deleted", (payload) => {
          setAllMessages((prev) =>
            prev.map((message) =>
              message.id === payload.message_id
                ? {
                    ...message,
                    is_deleted: true,
                    deleted_at: payload.deleted_at,
                    deleted_by: payload.deleted_by,
                  }
                : message,
            ),
          );
        });

        ch.on("message_delete_failed", (payload) => {
          if (payload.revert) {
            setAllMessages((prev) =>
              prev.map((message) =>
                message.id === payload.message_id
                  ? {
                      ...message,
                      is_deleted: false,
                      deleted_at: null,
                      deleted_by: null,
                    }
                  : message,
              ),
            );
          }

          actionToast({
            title: "Failed to delete message",
            description:
              payload.error || "An error occurred while deleting the message",
            label: "OK",
            onActioned: () => {},
          });
        });

        ch.on("message_delete_confirmed", () => {
          invalidateQueries();
        });
      })
      .catch((err) => console.error("Channel join failed", err));
  }, [account, selectedChatId]);
}
