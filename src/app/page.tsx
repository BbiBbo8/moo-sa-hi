import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";
import SectionDivider from "@/components/landing/SectionDivider";
import Image from "next/image";
import Footer from "@/components/landing/Footer";

const HomePage = () => {
  return (
    <main className="space-y-[20px] pt-[50px] pb-[60px]">
      <section className="relative h-[400px] w-full pt-[200px]">
        {/* 배경 이미지 */}
        <div className="absolute top-0 left-0 mt-[40px] h-full w-full">
          <Image
            src="/landing/landing1.svg"
            alt="랜딩페이지 표지 이미지"
            fill
            className="mt-21 object-cover"
          />
        </div>

        {/* AlertBanner 오버레이 */}
        <div className="absolute top-0 left-0 z-10 w-full pt-6">
          <AlertBanner />
        </div>
      </section>
      <MapPreview />
      <SectionDivider />
      <NewsCard />
      <SectionDivider />
      <LandingBanner />
      <SectionDivider />
      <Footer/>
    </main>
  );
};

export default HomePage;
