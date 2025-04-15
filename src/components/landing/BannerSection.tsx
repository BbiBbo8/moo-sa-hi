"use client";

import { Button } from "@/components/ui/button";

const LandingBanner = () => {
  return (
    <section className="relative h-[220px] bg-gradient-to-r from-blue-500 to-sky-400 flex flex-col justify-center items-center text-center px-4 mx-[20px] rounded-2xl shadow-lg overflow-hidden">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-wide mb-2">
        빠르고 안전한 대피소 찾기
      </h1>
      <p className="text-white/90 text-sm sm:text-base mb-4 drop-shadow-sm">
        근처의 재난 대피소 정보를 한눈에 확인하세요
      </p>

      <Button
        asChild
        className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition-colors px-6 py-2 rounded-full font-semibold"
      >
        <a
          href="https://www.safekorea.go.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          재난안전포털 바로가기
        </a>
      </Button>
    </section>
  );
};

export default LandingBanner;