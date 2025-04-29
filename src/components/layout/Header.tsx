"use client";

import { usePathname, useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import Image from "next/image";
import NotificationButton from "@/components/layout/NotificationButton";
import Logo from "public/typos/logo.svg"

const Header = () => {  
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b bg-white px-5 py-5">
      {/* 뒤로가기 버튼 (랜딩 페이지에서는 숨김) */}
      {isLandingPage ? <div className="w-7" /> : (
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
          src={Logo}
          alt="중앙로고"
          height={96}
          width={96}
        ></Image>
      </button>

      {/* 오른쪽 알림 버튼 */}
      <div className="mt-1">
      <NotificationButton />
      </div>
    </header>
  );
};
export default Header;