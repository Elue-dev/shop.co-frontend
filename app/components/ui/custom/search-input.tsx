import { ChangeEventHandler } from "react";
import { Input } from "../input";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <section>
      <div className="flex items-center justify-center w-[400px] bg-[#f8f8f8] border-0 rounded-full py-1">
        <Search className="h-5 mr-2 text-gray-600 ml-5" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-0 outline-0 -ml-2"
        />
      </div>
    </section>
  );
}
