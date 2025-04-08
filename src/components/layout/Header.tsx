// src/components/layout/Header.tsx

"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

 function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 랜딩 페이지인지 확인하기
  const isLandingPage = pathname === "/";
  // 헤더 숨길 페이지 목록
  const hiddenRoutes = ["/post-create"];

  // 특정 페이지에서 헤더 안 보이게
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="w-full py-4 px-4 flex items-center justify-between border-b">
      {/* 뒤로가기 버튼 (랜딩 페이지에서는 숨김) */}
      {isLandingPage ? (
        <div className="w-5 h-5" /> // 공간만 유지
      ) : (
        <button onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* 중앙 로고 자리 */}
      <h1 className="absolute left-1/2 -translate-x-1/2">
        로고자리
      </h1>

      {/* 오른쪽 여백 (뒤로가기와 균형 맞추기용) */}
      <div className="w-5 h-5" />
    </header>
  );
}
export default Header;