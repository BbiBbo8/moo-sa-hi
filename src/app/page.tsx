import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";
import SectionDivider from "@/components/landing/SectionDivider";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="space-y-[20px] py-6 pb-[60px]">
      <section className="relative h-[500px] w-full">
        {/* 배경 이미지 */}
        <Image
          src="/landing/landing.svg"
          alt="랜딩페이지 표지 이미지"
          fill
          className="object-cover"
        />

        {/* AlertBanner 오버레이 */}
        <div className="absolute top-0 left-0 z-10 w-full pt-6">
          <AlertBanner />
        </div>
      </section>
      <SectionDivider />
      <MapPreview />
      <SectionDivider />
      <NewsCard />
      <SectionDivider />
      <LandingBanner />
    </main>
  );
};

export default HomePage;
