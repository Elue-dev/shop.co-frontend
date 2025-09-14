import { ErrorToast, SuccessToast } from "@/components/types/toast";
import { toast } from "sonner";

export function successToast({
  title = "",
  description,
  duration = 4000,
  position = "top-center",
}: SuccessToast) {
  const successToastId = toast.success(title, {
    description,
    duration,
    position,
  });

  return successToastId;
}

export function errorToast({
  title = "",
  description,
  duration = 4000,
  position = "top-center",
}: ErrorToast) {
  const successToastId = toast.error(title, {
    description,
    duration,
    position,
  });

  return successToastId;
}
