import { cn } from "@/lib/utils";
import { Card } from "../card";

export default function AppCard({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return <Card className={cn("p-5", classNames)}>{children}</Card>;
}
