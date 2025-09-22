import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";

export function getInitials(name: string) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function formatTimestamp(timestamp: string) {
  const date = parseISO(timestamp);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isThisWeek(date)) {
    return format(date, "EEEE");
  }

  return format(date, "dd MMM yyyy");
}

export function formatDateShort(timestamp: string) {
  const date = new Date(timestamp);
  return format(date, "MMMM d, yyyy");
}
