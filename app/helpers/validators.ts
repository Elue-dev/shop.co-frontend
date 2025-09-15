import { FormValidateOrFn } from "@tanstack/react-form";

interface ValidatorConfig {
  onChange?: FormValidateOrFn<_TSFixMe>;
  onBlur?: FormValidateOrFn<_TSFixMe>;
  onSubmit?: FormValidateOrFn<_TSFixMe>;
}

export const validators = {
  required: (fieldName: string = "Field"): ValidatorConfig => ({
    onChange: ({ value }: { value: _TSFixMe }) => {
      const isEmpty =
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0);
      return isEmpty ? `${fieldName} is required` : undefined;
    },
  }),

  minLength: (min: number, fieldName: string = "Field"): ValidatorConfig => ({
    onChange: ({ value }: { value: string }) =>
      !value
        ? `${fieldName} is required`
        : value.length < min
          ? `${fieldName} must be at least ${min} characters`
          : undefined,
  }),

  maxLength: (max: number, fieldName: string = "Field"): ValidatorConfig => ({
    onChange: ({ value }: { value: string }) =>
      value && value.length > max
        ? `${fieldName} must be no more than ${max} characters`
        : undefined,
  }),

  email: {
    onChange: ({ value }: { value: string }) => {
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? "Please enter a valid email" : undefined;
    },
  } as ValidatorConfig,

  password: {
    onChange: ({ value }: { value: string }) =>
      !value
        ? "Password is required"
        : value.length < 6
          ? "Password must be at least 6 characters"
          : undefined,
  } as ValidatorConfig,

  confirmPassword: (passwordFieldValue: string): ValidatorConfig => ({
    onChange: ({ value }: { value: string }) => {
      if (!value) return "Please confirm your password";
      return value !== passwordFieldValue
        ? "Passwords do not match"
        : undefined;
    },
  }),

  phone: {
    onChange: ({ value }: { value: string }) => {
      if (!value) return "Phone number is required";
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      return !phoneRegex.test(value)
        ? "Please enter a valid phone number"
        : undefined;
    },
  } as ValidatorConfig,
};
