"use client";

import { cn } from "@/lib/utils";

const dummyMessagesArray = Array.from({ length: 20 }).map((_, i) => ({
  isSender: i % 2 === 0,
}));

export default function MessagesLoader() {
  return (
    <div className="flex-1 overflow-y-hidden px-3 pt-4">
      <div className="flex flex-col mt-3 pb-4">
        {dummyMessagesArray.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-start gap-2 animate-pulse",
              msg.isSender ? "flex-row-reverse" : "flex-row",
            )}
          >
            <div className="rounded-full w-6 h-6 bg-[#d8d8d8]" />

            <div
              className={cn(
                "flex flex-col max-w-[70%]",
                msg.isSender ? "items-end" : "items-start",
              )}
            >
              <div className="px-3 py-6 rounded-lg h-4 w-32 bg-[#d8d8d8]" />
              <div className="h-3 w-12 bg-[#d8d8d8] rounded mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
