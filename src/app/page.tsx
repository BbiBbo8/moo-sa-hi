import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";
import SectionDivider from "@/components/landing/SectionDivider";

const HomePage = () => {
  return (
    <main className="py-6 space-y-[20px] pb-[60px]">
      <AlertBanner />
      <SectionDivider />
      <MapPreview />
      <SectionDivider />
      <NewsCard />
      <SectionDivider />
      <LandingBanner />
    </main>
  );
}

export default HomePage;