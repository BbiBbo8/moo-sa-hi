"use client";

import { usePathname, useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import Image from "next/image";
import { useState,useEffect } from "react";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import getUserData from "@/supabase/getUserData";
import useNotificationSubscription from "@/hooks/useNotificationSubscription";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newalarm, setNewalarm] = useState(false); // 새로운 알림 상태
  const [userId, setUserId] = useState<string | null>(null);


  // 현재 랜딩 페이지인지 확인하기
  const isLandingPage = pathname === PATH.HOME;
  // 헤더 숨길 페이지 목록
  const hiddenRoutes: string[] = [
    PATH.CREATE,
    PATH.COMMUNITYSHELTER,
    PATH.COMMUNITYDAILY,
  ];

  // 특정 페이지에서 헤더 안 보이게
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push(PATH.HOME);
  };

  useEffect(() => {
    const fetchId = async () => {
      const userData = await getUserData();
      setUserId(userData?.user?.id || null);
    };

    fetchId();
  }, []);

  useNotificationSubscription(userId, (payload) => {
    console.log("새로운 알림 도착 (헤더) - Hook!", payload.new);
    setNewalarm(true);
  });

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-4">
      {/* 뒤로가기 버튼 (랜딩 페이지에서는 숨김) */}
      {isLandingPage ? (
        <div className="h-5 w-5" /> // 공간만 유지
      ) : (
        <button onClick={handleBack}>
          <Image
            src="/icons/chevron-left-solid 1.svg"
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 중앙 로고 자리 */}
      <button onClick={handleHome}>
        <Image
          src="/typos/logo.svg"
          alt="중앙로고"
          height={24}
          width={65}
        ></Image>
      </button>

      {/* 오른쪽 알림 아이콘 및 드롭다운 */}
      <div className="relative">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="relative ml-4">
              {/* 조건부 이미지 렌더링 */}
              <Image
                src={
                  newalarm ? "/icons/alarm1.svg" : "/icons/alarm.svg"
                }
                alt="알림로고"
                height={24}
                width={24}
              />
            </button>
          </DropdownMenuTrigger>
          <NotificationDropdown
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
          />
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Header;
