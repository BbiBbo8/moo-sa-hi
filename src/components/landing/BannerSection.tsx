"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import banner1 from "/public/landing/banner1.svg";
import banner2 from "/public/landing/banner2.svg";
import banner3 from "/public/landing/banner3.svg";
import banner4 from "/public/landing/banner4.svg";
import surveyBanner from "/public/landing/survey_banner.svg";

const bannerItems = [
  {
    src: banner1,
    alt: "배너 1",
    href: "https://simte.xyz/childsafe4",
  },
  {
    src: banner2,
    alt: "배너 2",
    href: "https://simte.xyz/childsafe3",
  },
  {
    src: banner3,
    alt: "배너 3",
    href: "https://www.mois.go.kr/frt/a01/frtMain.do",
  },
  {
    src: banner4,
    alt: "배너 4",
    href: "https://kasem.safekorea.go.kr/ptlCont.do?url=sftCnterRgnMng#none",
  },
  {
    src: surveyBanner,
    alt: "배너 5",
    href: "https://forms.gle/cDWurtF1iretHftk7",
  },
];

const BannerSection = () => {
  // 스크롤 컨테이너를 참조하기 위한 ref
  const containerRef = useRef<HTMLDivElement>(null);
  // 자동 스크롤을 일시 정지하기 위한 상태
  const [isPaused, setIsPaused] = useState(false);
  // 현재 스크롤 위치를 추적하기 위한 상태
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      // 배너 하나의 너비와 간격을 합친 값 (스크롤 단위)
      const bannerWidthWithGap = 320 + 16;
      // 마지막 배너에서 멈출 시간 (밀리초)
      const pauseDuration = 2000;

      // 자동 스크롤 간격 설정
      const autoScrollInterval = setInterval(() => {
        // 스크롤이 일시 정지되지 않았을 때만 실행
        if (!isPaused) {
          // 스크롤 가능한 최대 위치 계산
          const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.offsetWidth;
          // 현재 스크롤 위치가 최대 스크롤 위치 근처에 도달했을 때
          if (scrollPosition >= maxScroll - 1) {
            // 스크롤 일시 정지
            setIsPaused(true);
            // 잠시 멈춘 후 처음으로 되돌리기
            setTimeout(() => {
              setScrollPosition(0);
              setIsPaused(false);
              scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
            }, pauseDuration);
          } else {
            // 스크롤 위치 업데이트 및 스크롤 이동
            setScrollPosition(
              prevPosition => prevPosition + bannerWidthWithGap,
            );
            scrollContainer.scrollTo({
              left: scrollPosition + bannerWidthWithGap,
              behavior: "smooth",
            });
          }
        }
      }, 3000); // 3초마다 스크롤

      // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수 방지
      return () => clearInterval(autoScrollInterval);
    }
  }, [isPaused, scrollPosition]); // isPaused 또는 scrollPosition이 변경되면 useEffect 다시 실행 (여기서는 의도적으로 처음 한 번만 실행되도록 함)

  return (
    <section className="mx-[20px] pb-8">
      <div className="mb-4">
        <h2 className="text-[20px] leading-[26px] font-semibold text-gray-900">
          재난을 무사히 준비하세요
        </h2>
        <p className="mt-1 text-[16px] text-gray-600">
          대피소 · 정보 · 퀴즈까지
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {bannerItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[320px] min-w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-xl border-1 shadow-sm sm:min-w-[320px]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={320}
              height={140}
              className="h-full w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
