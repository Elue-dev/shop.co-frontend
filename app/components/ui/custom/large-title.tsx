import { cn } from "@/lib/utils";

interface TitleProps {
  text: string;
  centered?: boolean;
  classNames?: string;
}

export const LargeTitle = ({ text, centered, classNames }: TitleProps) => {
  return (
    <h1 className={cn("text-[22px]", centered && "text-center", classNames)}>
      {text}
    </h1>
  );
};
