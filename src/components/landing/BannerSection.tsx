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
    <section className="overflow-x-auto pb-4">
      <div className="flex gap-4 px-[20px] w-max">
        {bannerItems.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[280px] sm:min-w-[320px] max-w-[320px] rounded-xl overflow-hidden shadow-md flex-shrink-0"
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