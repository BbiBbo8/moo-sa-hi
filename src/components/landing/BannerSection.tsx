"use client";

import { Button } from "@/components/ui/button";

export default function LandingBanner() {
  const handleExternalLink = () => {
    window.open("https://www.safekorea.go.kr", "_blank"); // 외부 URL을 새 창에서 열기
  };

  return (
    <section className="relative w-full h-[300px] bg-blue-300 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl font-bold mb-2">빠르고 안전한 대피소 찾기</h1>
      <p>근처의 재난 대피소 정보를 한눈에 확인하세요</p>
      <Button onClick={handleExternalLink} className="text-white bg-blue-600 hover:bg-blue-700">
        재난안전포털 바로가기
      </Button>
    </section>
  );
}