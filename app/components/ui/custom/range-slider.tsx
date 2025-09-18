"use client";

import { Dispatch, SetStateAction } from "react";
import { Slider } from "@/app/components/ui/slider";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  classNames?: string;
}

export default function RangeSlider({
  value,
  setValue,
  classNames,
}: SliderProps) {
  return (
    <div className={cn("w-full space-y-3 cursor-pointer", classNames)}>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span className="text-black text-[13px] font-medium">${value[0]}</span>
        <span className="text-black text-[13px] font-medium">
          ${value[1].toLocaleString()}
        </span>
      </div>
    </div>
  );
}
