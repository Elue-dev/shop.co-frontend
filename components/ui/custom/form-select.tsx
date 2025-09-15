"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  form: _TSFixMe;
  name: string;
  label?: string;
  placeholder?: string;
  validators?: _TSFixMe;
  options: Option[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  form,
  name,
  label,
  placeholder,
  validators = {},
  options,
  className = "",
  disabled = false,
  required = false,
}) => {
  return (
    <form.Field name={name} validators={validators}>
      {(field: _TSFixMe) => (
        <div className={cn("form-group mb-5", className)}>
          {label && (
            <label className="block text-base font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <Select
            value={field.state.value}
            onValueChange={field.handleChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(
                "w-[400px]",
                field.state.meta.errors.length > 0 &&
                  "border border-red-500 focus:border-red-500",
                disabled && "bg-gray-100 cursor-not-allowed",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

export default FormSelect;
