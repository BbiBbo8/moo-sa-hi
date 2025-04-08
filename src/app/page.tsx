import AlertBanner from "@/components/landing/AlertBanner";
import MapPreview from "@/components/landing/MapPreview";


export default function HomePage() {
  return (
    <main className="px-4 py-6 space-y-8">
      <AlertBanner />
      <MapPreview />
      
    </main>
  );
}