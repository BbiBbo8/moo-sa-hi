"use client";

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import * as React from "react";

// 토스트 컨텍스트 및 UI 정의
// 토스트 옵션 타입 명시: title은 필수, description과 variant는 선택
type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

// 명확한 타입으로 ToastContext 생성: toast() 함수는 ToastOptions 타입을 받음
const ToastContext = React.createContext<{
  toast: (options: ToastOptions) => void;
}>({
  toast: () => {}, // 초기 빈 함수 (Provider 내부에서 실제 구현됨)
});

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // ToastOptions에 고유 ID를 추가한 타입 정의 → toasts 상태에서 각 토스트를 식별하기 위함
  type ToastOptionsWithId = ToastOptions & { id: number };

  // toasts 상태에 ToastOptionsWithId 배열 사용 → 개별 토스트 구분 가능
  const [toasts, setToasts] = React.useState<ToastOptionsWithId[]>([]);

  // toast 함수는 ToastOptions 타입을 받아 toasts에 새 항목 추가
  const toast = (props: ToastOptions) => {
    const id = Date.now();
    setToasts([...toasts, { id, ...props }]);
    setTimeout(() => {
      setToasts(toasts => toasts.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {toasts.map(({ id, title, description, variant }) => (
          <Toast
            key={id}
            className={cn(variant === "destructive" && "bg-red-500 text-white")}
          >
            <div className="grid gap-1">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </div>
            <ToastClose className="text-white">X</ToastClose>
          </Toast>
        ))}
        <ToastViewport className="fixed top-4 right-4 z-50" />
      </ToastProvider>
    </ToastContext.Provider>
  );
}
