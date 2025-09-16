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
  const date = parseISO(timestamp); // convert ISO string to Date

  if (isToday(date)) {
    // Show just the time: 15:53
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isThisWeek(date)) {
    // Show weekday: Monday, Tuesday, etc.
    return format(date, "EEEE");
  }

  // Otherwise, show date: 16 Sep 2025
  return format(date, "dd MMM yyyy");
}
