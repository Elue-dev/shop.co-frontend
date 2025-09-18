import { cn } from "@/lib/utils";

interface TitleProps {
  text: string;
  centered?: boolean;
  classNames?: string;
}

export const LargeTitle = ({ text, centered, classNames }: TitleProps) => {
  // i added this because for some reason, the Integral font screws up with the parentheses if added i.e (), so i changed the font to Satoshi
  function renderTextWithFixedParentheses(text: string) {
    return text.split("").map((char, index) => {
      if (char === "(" || char === ")") {
        return (
          <span key={index} style={{ fontFamily: "Satoshi, sans-serif" }}>
            {char}
          </span>
        );
      }
      return char;
    });
  }

  return (
    <h1 className={cn("text-[22px]", centered && "text-center", classNames)}>
      {renderTextWithFixedParentheses(text)}
    </h1>
  );
};
