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

const SigninDrawer = () => {
  const router = useRouter();
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">로그인 테스트 버튼</Button>
      </DrawerTrigger>
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
            onClick={() => router.back()}
          >
            다음에 할래요
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SigninDrawer;
