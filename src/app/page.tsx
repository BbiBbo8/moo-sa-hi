import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";
import LandingBanner from "@/components/landing/BannerSection";
import SigninDrawer from "@/components/auth/SigninDrawer";
import LogoutButton from "@/components/auth/LogoutButton";
import NewsCard from "@/components/landing/NewsCard";

const HomePage = () => {
  return (
    <main className="px-4 py-6 space-y-8">
      <SigninDrawer />
      <LogoutButton />
      <>상단 배너</>
      <AlertBanner />
      <>지도 미리보기 클릭시 = map페이지로 이동</>
      <MapPreview />
      <h2 className="mb-4 text-2xl font-bold">카드 뉴스</h2>
      <NewsCard />
      <p>배너섹션 = 재난안전포털 외부 url 연결</p>
      <LandingBanner />
    </main>
  );
}

export default HomePage;