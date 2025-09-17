import {
  ActionToast,
  ErrorToast,
  SuccessToast,
} from "@/components/types/toast";
import { toast } from "sonner";

export function successToast({
  title = "",
  description,
  duration = 4000,
  position = "top-right",
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
  position = "top-right",
}: ErrorToast) {
  const successToastId = toast.error(title, {
    description,
    duration,
    position,
  });

  return successToastId;
}

export function actionToast({
  title = "",
  description,
  label,
  position = "top-right",
  onActioned,
}: ActionToast) {
  const toastId = toast(title, {
    description,
    action: {
      label,
      onClick: () => {
        onActioned();
        toast.dismiss(toastId);
      },
    },
    duration: Infinity,
    position,
  });
  return toastId;
}

type ErrorObject = Record<string, string[] | string | Record<string, _TSFixMe>>;

export function renderServerErrors(
  mainMessage: string,
  errorObject?: ErrorObject,
) {
  let parsedMain = mainMessage || "An unexpected error occurred";
  const parsedErrors: string[] = [];

  if (typeof errorObject === "string") {
    parsedMain = errorObject;
  }

  if (errorObject?.detail && typeof errorObject.detail === "string") {
    parsedMain = errorObject.detail;
  }

  if (errorObject && typeof errorObject === "object") {
    for (const key in errorObject) {
      const messages = errorObject[key];

      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          if (typeof msg === "string") {
            parsedErrors.push(msg);
            errorToast({
              title: key.replace(/_/g, " ").toUpperCase(),
              description: msg,
            });
          }
        });
      } else if (typeof messages === "string") {
        parsedErrors.push(messages);
        errorToast({
          title: key.replace(/_/g, " ").toUpperCase(),
          description: messages,
        });
      } else if (typeof messages === "object") {
        renderServerErrors(mainMessage, messages as ErrorObject);
      }
    }

    if (parsedErrors.length === 0 && parsedMain) {
      errorToast({
        title: "Error",
        description: parsedMain,
      });
    }
  } else {
    errorToast({
      title: "Error",
      description: parsedMain,
    });
  }
}
