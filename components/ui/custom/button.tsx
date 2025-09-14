import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { ShadButton } from "@/components/ui/button";

interface ButtonProps {
  children?: ReactNode;
  label: string;
  classNames?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  label,
  classNames,
  onClick,
  isLoading,
  disabled,
}: ButtonProps) {
  return (
    <ShadButton
      onClick={disabled || isLoading ? () => {} : () => onClick?.()}
      className={cn(
        "bg-black hover:bg-black/90 text-white font-bold py-[26px] rounded-lg cursor-pointer w-full",
        disabled && "opacity-50 cursor-not-allowed",
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
