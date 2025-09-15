"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import React from "react";

interface FormOTPProps {
  form: _TSFixMe;
  name: string;
  label?: string;
  validators?: _TSFixMe;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormOTP: React.FC<FormOTPProps> = ({
  form,
  name,
  label,
  validators = {},
  className = "",
  disabled = false,
  required = false,
}) => {
  return (
    <form.Field name={name} validators={validators}>
      {(field: _TSFixMe) => (
        <div className={cn("form-group mb-5", className)}>
          {label && (
            <label
              htmlFor={field.name}
              className="block text-base font-medium mb-1 text-center"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              disabled={disabled}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={cn(
                      field.state.meta.errors.length > 0 &&
                        "border-red-500 focus:border-red-500",
                      disabled && "bg-gray-100 cursor-not-allowed",
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {field.state.meta.errors.length > 0 && (
            <div className="text-center mt-2">
              <span className="text-red-500 text-sm">
                {field.state.meta.errors[0]}
              </span>
            </div>
          )}
        </div>
      )}
    </form.Field>
  );
};

export default FormOTP;
