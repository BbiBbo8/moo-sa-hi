"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

// pop을 묶는 큰 묶음
const Popover = PopoverPrimitive.Root;

// popover를 실행시키는 트리거
const PopoverTrigger = PopoverPrimitive.Trigger;

// popover의 추가 기능인데 쓰이지 않음
const PopoverAnchor = PopoverPrimitive.Anchor;

// 트리거가 충족되면 보일 컨텐츠
const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 0, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/50">
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 flex w-full origin-[--radix-popover-content-transform-origin] -translate-x-1/7 rounded-md border border-transparent p-4 shadow-md outline-none",
          className,
        )}
        {...props}
      />
    </div>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
