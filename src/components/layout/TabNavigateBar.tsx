"use client";

import React from "react";
import Link from "next/link";
import PATH from "@/constants/PATH";
import { usePathname } from "next/navigation";
import Image from "next/image";
import houseBlue from "public/icons/layout/house-solid-blue.svg";
import houseGray from "public/icons/layout/house-solid-grey.svg";

const TabNavigateBar = () => {
  const pathname = usePathname();
  // 지도, 글 작성, 게시글 상세 페이지에서 숨기기
  const shouldHide =
    pathname.startsWith(PATH.COMMUNITYSHELTER + "/") ||
    pathname.startsWith(PATH.COMMUNITYDAILY + "/") ||
    pathname === PATH.MAP ||
    pathname.startsWith(PATH.MAP + "/") ||
    pathname === PATH.CREATE;

  if (shouldHide) return null;

  return (
    <section className="fixed bottom-0 z-50 flex h-fit w-full justify-center border border-[#FAFAFA] bg-[#FAFAFA]">
      <div className="flex w-full justify-between bg-[#FAFAFA] px-5 py-1.5 text-center text-sm font-medium">
        <Link href={PATH.HOME} className="h-full min-w-1/5">
          <div className="flex flex-col items-center">
            {/* 랜딩 페이지(홈)으로 이동 */}
            <Image
              src={pathname === PATH.HOME ? houseBlue : houseGray}
              alt="홈"
              width={28}
              height={28}
            />
            <h5
              className={
                pathname === PATH.HOME ? "text-[#2889E4]" : "text-[#B3B3B3]"
              }
            >
              홈
            </h5>
          </div>
        </Link>
        <Link href={PATH.MAP} className="h-full min-w-1/5">
          <div className="flex flex-col items-center">
            {/* 지도 페이지로 이동 */}
            <Image
              src={
                pathname === PATH.MAP
                  ? "/icons/layout/map-location-dot-solid-blue.svg"
                  : "/icons/layout/map-location-dot-solid-grey.svg"
              }
              alt="지도"
              width={28}
              height={28}
            />
            <h5
              className={
                pathname === PATH.MAP ? "text-[#2889E4]" : "text-[#B3B3B3]"
              }
            >
              대피소
            </h5>
          </div>
        </Link>
        <Link href={PATH.COMMUNITYSHELTER} className="h-full min-w-1/5">
          <div className="flex flex-col items-center">
            {/* 커뮤니티 (기본은 대피소 커뮤니티)로 이동 */}
            <Image
              src={
                pathname.startsWith(PATH.COMMUNITYSHELTER)
                  ? "/icons/layout/comments-solid-blue.svg"
                  : "/icons/layout/comments-solid-grey.svg"
              }
              alt="커뮤니티"
              width={28}
              height={28}
            />
            <h5
              className={
                pathname.startsWith(PATH.COMMUNITYSHELTER)
                  ? "pt-0.5 text-[#2889E4]"
                  : "pt-0.5 text-[#B3B3B3]"
              }
            >
              커뮤니티
            </h5>
          </div>
        </Link>
        <Link href={PATH.PROFILE} className="h-full min-w-1/5">
          <div className="flex flex-col items-center justify-center">
            {/* 마이페이지로 이동 */}
            <Image
              src={
                pathname === PATH.PROFILE
                  ? "/icons/layout/user-solid-blue.svg"
                  : "/icons/layout/user-solid-grey.svg"
              }
              alt="마이"
              width={24}
              height={24}
            />
            <h5
              className={
                pathname === PATH.PROFILE ? "text-[#2889E4]" : "text-[#B3B3B3]"
              }
            >
              마이
            </h5>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TabNavigateBar;
