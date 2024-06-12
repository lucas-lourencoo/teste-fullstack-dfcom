import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, errorMessage, ...props }, ref) => {
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

        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea";

export { Textarea };
