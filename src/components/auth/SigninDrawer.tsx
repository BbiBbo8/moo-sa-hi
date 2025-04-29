"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SocialLoginButtons from "./SocialLoginButtons";
import { useState } from "react";

interface signInDropProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const SigninDrawer = ({
  isOpen: initialIsOpen = false, // open 대신 isOpen 사용
  onOpenChange,
  children,
}: signInDropProps) => {
  const router = useRouter();

  // 내부 상태 관리 (isOpen이 제공되지 않았을 때 사용)
  const [internalIsOpen, setInternalIsOpen] = useState(false); // open 대신 isOpen 사용

  // 외부에서 제어되는지 여부
  const isControlled = initialIsOpen !== undefined && onOpenChange !== undefined;

  // 현재 열린 상태 (외부 제어 또는 내부 상태)
  const isCurrentlyOpen = isControlled ? initialIsOpen : internalIsOpen;

  // 상태 변경 핸들러
  const handleOpenChange = (open: boolean) => {
    // 내부 상태 업데이트 (비제어 모드에서만)
    if (!isControlled) {
      setInternalIsOpen(open);
    }

    // 외부 핸들러가 있으면 호출
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <Drawer open={isCurrentlyOpen} onOpenChange={handleOpenChange}>
      {/* 제어 모드가 아닐 때만 트리거 표시 */}
      {!isControlled && (
        <DrawerTrigger asChild>
          {children || (
            <Button
              variant="ghost" // ghost 버튼 사용
              className="h-fit w-fit rounded-full px-4 py-2 font-medium text-[#666666] hover:bg-gray-100"
            >
              로그인 하기
            </Button>
          )}
        </DrawerTrigger>
      )}
      <DrawerContent className="rounded-t-2xl p-6">
        {/* 드래그 바 */}
        <DrawerTitle className="my-4 text-center text-lg font-semibold">
          로그인하면 더 많은
          <br />
          기능을 이용할 수 있어요!
        </DrawerTitle>

        {/* 로그인 버튼 영역 */}
        <div className="mt-6 flex justify-center gap-6 px-6">
          <SocialLoginButtons />
        </div>
        <DrawerFooter className="mt-6 border-t pt-4">
          <button
            className="w-full text-center text-sm text-gray-500"
            onClick={() => {
              handleOpenChange(false);
              router.back();
            }}
          >
            다음에 할래요
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SigninDrawer;