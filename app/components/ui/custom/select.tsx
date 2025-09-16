import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface AppSelectProps {
  items:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  value: string;
  onValueChange: (value: string) => void;
}

export default function AppSelect({
  items,
  value,
  onValueChange,
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
