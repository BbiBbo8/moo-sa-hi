"use client";

import React from "react";
import { FileText, Home, MapPin, UserRound } from "lucide-react";
import Link from "next/link";
import PATH from "@/constants/PATH";
import { usePathname } from "next/navigation";

const TabNavigateBar = () => {
  const pathname = usePathname();
  // 지도 페이지에서 숨기기
  const hiddenRoutes = [PATH.MAP];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <section className="flex w-full justify-center px-5">
      <div className="fixed bottom-0 z-50 mb-4 inline-flex h-fit min-w-80 justify-evenly rounded-full border border-transparent bg-[#262626] text-center text-white">
        <Link href={PATH.HOME} className="w-fit py-0.5">
          {/* 랜딩 페이지(홈)으로 이동 */}
          <Home className="h-7 w-full text-center" />
          <h5 className="text-xs">홈</h5>
        </Link>
        <Link href={PATH.MAP} className="h-fit w-fit py-0.5">
          {/* 지도 페이지로 이동 */}
          <MapPin className="h-7 w-full text-center" />
          <h5 className="text-xs">대피소</h5>
        </Link>
        <Link href={PATH.COMMUNITYSHELTER} className="w-fit py-0.5">
          {/* 커뮤니티 (기본은 대피소 커뮤니티)로 이동 */}
          <FileText className="h-7 w-full text-center" />
          <h5 className="text-xs">커뮤니티</h5>
        </Link>
        <Link href={PATH.PROFILE} className="w-fit py-0.5">
          {/* 마이페이지로 이동 */}
          <UserRound className="h-7 w-full text-center" />
          <h5 className="text-xs">마이</h5>
        </Link>
      </div>
    </section>
  );
};

export default TabNavigateBar;
