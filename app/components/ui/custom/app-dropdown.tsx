import { Fragment, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  action: () => void;
}

interface DropdownProps {
  children: ReactNode;
  header?: ReactNode;
  items: DropdownItem[];
}

export default function AppDropdown({
  children,
  header,
  items,
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[220px] mt-2">
        {header && (
          <Fragment>
            <DropdownMenuLabel className="space-y-0.5">
              {header}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </Fragment>
        )}

        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.action}
            className="cursor-pointer"
          >
            {item.icon && item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
