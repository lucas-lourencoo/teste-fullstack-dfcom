import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={props.name}
            className="font-semibold mb-2 inline-block"
          >
            {label}
          </label>
        )}

        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="text-red-500 text-sm block mb-1">
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
