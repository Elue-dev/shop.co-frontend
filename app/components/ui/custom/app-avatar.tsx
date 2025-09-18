import { getInitials } from "@/app/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { cn } from "@/lib/utils";

interface CommonProps {
  size?: "xsm" | "sm" | "lg";
  variant?: "light" | "dark";
  classNames?: string;
}

interface AvatarWithName extends CommonProps {
  name: string;
  source?: never;
}

interface AvatarWithSource extends CommonProps {
  source: string;
  name?: never;
}

type AvatarProps = AvatarWithName | AvatarWithSource;

export default function AppAvatar({
  name,
  source,
  classNames,
  size = "lg",
  variant = "light",
}: AvatarProps) {
  const initials = getInitials(name ?? "");

  return (
    <Avatar
      className={cn(
        "bg-gray300",
        size === "xsm" ? "w-6 h-6" : size === "sm" ? "w-8 h-8" : "w-12 h-12",
        classNames,
      )}
    >
      <AvatarImage src={source} />
      <AvatarFallback
        className={cn(
          size === "xsm"
            ? "text-[12px] font-medium"
            : size === "sm"
              ? "text-base font-bold"
              : "text-lg font-bold",
          variant === "dark"
            ? "bg-black text-gray300"
            : "bg-gray300 text-black",
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
