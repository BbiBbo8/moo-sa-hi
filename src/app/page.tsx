import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";
import SectionDivider from "@/components/landing/SectionDivider";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="mx-auto w-full max-w-[640px] min-w-[320px] space-y-[35px] pt-[50px] pb-[60px]">
      <section className="flex w-full flex-col items-center justify-center">
        <div className="z-10 w-full pt-3 pb-11">
          <AlertBanner />
        </div>
        <article className="mb-8 flex max-w-[304px] flex-col gap-2">
          <h1 className="text-headlineM w-full text-gray-900">
            무사히, 일상으로 돌아가는 길
          </h1>
          <p className="text-bodyL w-full text-gray-600">
            재난 상황에서도 당황하지 않도록 지금 내 주변의 대피소와 안전 정보를
            한눈에 확인하세요.
          </p>
        </article>
        <div className="relative h-[290px] w-[292px]">
          {/* 배경 이미지 */}
          <Image
            src="/landing/main-image.svg"
            alt="랜딩페이지 표지 이미지"
            fill
            className="object-cover"
          />
        </div>
        {/* AlertBanner 오버레이 */}
      </section>
      <MapPreview />
      <SectionDivider />
      <NewsCard />
      <SectionDivider />
      <LandingBanner />
    </main>
  );
};

export default HomePage;
