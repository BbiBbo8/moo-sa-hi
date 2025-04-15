import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";

const HomePage = () => {
  return (
    <main className="py-6 space-y-[20px] pb-[60px]">
      <AlertBanner />
      <MapPreview />
      <NewsCard />
      <LandingBanner />
    </main>
  );
}

export default HomePage;