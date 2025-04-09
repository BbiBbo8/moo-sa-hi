"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google 아이콘
import { SiKakaotalk } from "react-icons/si"; // Kakao 아이콘
import SocialLoginButtons from "./SocialLoginButtons";
const SigninDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">로그인 테스트 버튼</Button>
      </DrawerTrigger>

      <DrawerContent className="rounded-t-2xl p-6">
        {/* 드래그 바 */}
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300" />

        <DrawerTitle className="text-center text-lg font-semibold">
          로그인하면 더 많은
          <br />
          기능을 이용할 수 있어요!
        </DrawerTitle>

        {/* 로그인 버튼 영역 */}
        <div className="mt-6 flex justify-center gap-6 px-6">
          <SocialLoginButtons />
        </div>
        <DrawerFooter className="mt-6 border-t pt-4">
          <button className="w-full text-center text-sm text-gray-500">
            다음에 할래요
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default SigninDrawer;
