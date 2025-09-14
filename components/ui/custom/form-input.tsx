"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface FormInputProps {
  form: _TSFixMe;
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  validators?: _TSFixMe;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  form,
  name,
  label,
  type = "text",
  validators = {},
  placeholder,
  className = "",
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <form.Field name={name} validators={validators}>
      {(field: _TSFixMe) => (
        <div className={cn("form-group mb-5", className)}>
          {label && (
            <label
              htmlFor={field.name}
              className="block text-base font-medium mb-1"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <input
            id={field.name}
            name={field.name}
            type={type}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              field.handleChange(e.target.value)
            }
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "px-3 py-3 rounded-md bg-[#f8f8f8] min-w-[400px] outline-0",
              field.state.meta.errors.length > 0 &&
                "border border-red-500 focus:border-red-500",
              disabled && "bg-gray-100 cursor-not-allowed",
            )}
            {...props}
          />
          {field.state.meta.errors.length > 0 && (
            <span className="text-red-500 text-sm mt-1 block">
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      )}
    </form.Field>
  );
};

export default FormInput;
