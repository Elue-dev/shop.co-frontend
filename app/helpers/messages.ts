import { Message } from "../types/message";

export function groupMessagesByDate(messages: Message[]) {
  const grouped: { [key: string]: Message[] } = {};

  messages?.forEach((message) => {
    const date = new Date(message.inserted_at);
    const dateKey = date.toDateString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(message);
  });

  return grouped;
}

export function formatDateHeader(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function normalizeMessage(msg: _TSFixMe) {
  const m = msg.data ?? msg;
  return {
    id: m.id,
    content: m.content ?? "",
    sender: m.sender ?? { id: "unknown", first_name: "Unknown" },
    inserted_at: m.inserted_at,
    read_at: m.read_at ?? null,
  };
}
