import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { ShadButton } from "@/app/components/ui/button";

type ButtonBaseProps = {
  classNames?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  small?: boolean;
  auto?: boolean;
  inverted?: boolean;
};

type ButtonWithLabel = ButtonBaseProps & {
  label: string;
  children?: never;
};

type ButtonWithChildren = ButtonBaseProps & {
  children: ReactNode;
  label?: never;
};

export type ButtonProps = ButtonWithLabel | ButtonWithChildren;

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
        "bg-black hover:bg-black/90 text-white font-bold py-[26px] rounded-full cursor-pointer w-full",
        disabled && "opacity-50 cursor-not-allowed",
        small && "w-[200px]",
        auto && "w-auto",
        inverted && "bg-[#f8f8f8] text-black hover:bg-gray-200/70",
        classNames,
      )}
    >
      <div className="flex items-center justify-center gap-x-3 min-w-[150px]">
        {isLoading ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <Fragment>
            {children ? (
              children
            ) : (
              <p className="font-bold text-base">{label}</p>
            )}
          </Fragment>
        )}
      </div>
    </ShadButton>
  );
}
