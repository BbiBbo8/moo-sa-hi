"use client";

import React from "react";
import Link from "next/link";
import PATH from "@/constants/PATH";
import { usePathname } from "next/navigation";
import Image from "next/image";

const TabNavigateBar = () => {
  const pathname = usePathname();
  // 지도, 글 작성, 게시글 상세 페이지에서 숨기기
  const shouldHide =
    pathname.startsWith(PATH.COMMUNITYSHELTER + "/") ||
    pathname.startsWith(PATH.COMMUNITYDAILY + "/") ||
    pathname === PATH.MAP ||
    pathname === PATH.CREATE;

  if (shouldHide) return null;

  return (
    <section className="flex w-full justify-center">
      <div className="fixed bottom-0 z-50 mb-4 inline-flex h-fit w-11/12 justify-evenly rounded-full border border-transparent bg-[#262626] px-5 text-center text-sm font-medium text-white">
        <Link href={PATH.HOME} className="h-fit w-fit py-1">
          <div className="flex flex-col items-center">
            {/* 랜딩 페이지(홈)으로 이동 */}
            <Image
              src="icons/house-solid.svg"
              alt="홈"
              width={28}
              height={28}
            />
            <h5>홈</h5>
          </div>
        </Link>
        <Link href={PATH.MAP} className="h-fit w-fit py-1">
          <div className="flex flex-col items-center">
            {/* 지도 페이지로 이동 */}
            <Image
              src="icons/map-location-dot-solid.svg"
              alt="지도"
              width={28}
              height={28}
            />
            <h5>대피소</h5>
          </div>
        </Link>
        <Link href={PATH.COMMUNITYSHELTER} className="w-fit py-1">
          <div className="flex flex-col items-center">
            {/* 커뮤니티 (기본은 대피소 커뮤니티)로 이동 */}
            <Image
              src="icons/comments-solid-1.svg"
              alt="커뮤니티"
              width={28}
              height={28}
            />
          </div>
          <h5>커뮤니티</h5>
        </Link>
        <Link href={PATH.PROFILE} className="w-fit py-1">
          <div className="flex flex-col items-center">
            {/* 마이페이지로 이동 */}
            <Image
              src="icons/user-solid.svg"
              alt="마이"
              width={28}
              height={28}
            />
            <h5>마이</h5>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TabNavigateBar;
