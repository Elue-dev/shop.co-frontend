type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface SuccessToast {
  title?: string;
  description: string;
  duration?: number;
  position?: Position;
}

export interface ErrorToast {
  title?: string;
  description: string;
  duration?: number;
  position?: Position;
}

export interface InfoToast {
  title?: string;
  description: string;
  label?: string;
  duration?: number;
  position?: Position;

  callback?: () => void;
}

export interface WarningToast {
  title?: string;
  description: string;
  duration?: number;
  position?: Position;
}

export interface ActionToast {
  title?: string;
  label: string;
  description: string;
  onActioned: VoidFunction;
  position?: Position;
}
