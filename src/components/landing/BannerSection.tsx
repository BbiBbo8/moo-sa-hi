"use client";

import Image from "next/image";
import Link from "next/link";

const bannerItems = [
  {
    src: "/landing/banner1.svg",
    alt: "배너 1",
    href: "https://simte.xyz/childsafe4",
  },
  {
    src: "/landing/banner2.svg",
    alt: "배너 2",
    href: "https://simte.xyz/childsafe3",
  },
  {
    src: "/landing/banner3.svg",
    alt: "배너 3",
    href: "https://www.mois.go.kr/frt/a01/frtMain.do",
  },
  {
    src: "/landing/banner4.svg",
    alt: "배너 4",
    href: "https://kasem.safekorea.go.kr/ptlCont.do?url=sftCnterRgnMng#none",
  },
];

const BannerSection = () => {
  return (
    <section className="pb-8 mx-[20px]">
  <div className="mb-4">
    <h2 className="text-[20px] font-semibold text-[#1A1A1A] leading-[26px]">
      재난을 무사히 준비하세요
    </h2>
    <p className="text-[16px] text-[#666666] mt-1">대피소 · 정보 · 퀴즈까지</p>
  </div>

  <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory">
    {bannerItems.map((item, index) => (
      <Link
        key={index}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0 rounded-xl overflow-hidden shadow-md"
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={320}
          height={140}
          className="object-cover w-full h-full"
        />
      </Link>
    ))}
  </div>
</section>
  );
};

export default BannerSection;