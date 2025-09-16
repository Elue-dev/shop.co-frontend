import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { ShadButton } from "@/app/components/ui/button";

interface ButtonProps {
  children?: ReactNode;
  label: string;
  classNames?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  small?: boolean;
  auto?: boolean;
  inverted?: boolean;
}

export function Button({
  children,
  label,
  classNames,
  onClick,
  isLoading,
  disabled,
  small,
  auto,
  inverted,
}: ButtonProps) {
  return (
    <ShadButton
      onClick={disabled || isLoading ? () => {} : () => onClick?.()}
      className={cn(
        "bg-black hover:bg-black/90 text-white font-bold py-[24px] rounded-full cursor-pointer w-full",
        disabled && "opacity-50 cursor-not-allowed",
        small && "w-[200px]",
        auto && "w-auto",
        inverted && "bg-[#f8f8f8] text-black hover:bg-gray-200/70",
        classNames,
      )}
    >
      {children ? (
        children
      ) : (
        <div className="flex items-center justify-center">
          {isLoading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <p className="font-bold text-base">{label}</p>
          )}
        </div>
      )}
    </ShadButton>
  );
}
