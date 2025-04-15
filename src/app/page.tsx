import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import NewsCard from "@/components/landing/NewsCard";

const HomePage = () => {
  return (
    <main className="px-4 py-6 space-y-8">
      <AlertBanner />
      <MapPreview />
      <h2 className="mb-4 text-2xl font-bold">카드 뉴스</h2>
      <NewsCard />
      <LandingBanner />
    </main>
  );
}

export default HomePage;