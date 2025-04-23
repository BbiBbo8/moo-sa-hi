import * as React from "react";
import { cn } from "@/lib/utils";

// textarea 기본 컴포넌트 정의
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-input bg-background flex h-fit w-full rounded-md border px-3 py-2 text-sm",
        "placeholder:text-muted-foreground focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
