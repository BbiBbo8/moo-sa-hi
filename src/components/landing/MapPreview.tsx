"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapGeolocationComponent from "@/components/map/UserGeolocationMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PATH from "@/constants/PATH";

const LandingMapPreview = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const router = useRouter();

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleMapClick = (): void => {
    router.push(PATH.MAP);
  };

  return (
    <section className="mx-20px py-8">
      <Card className="p-4">
        {!center ? (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">내 위치 기반 대피소</h2>
            <Button
              onClick={handleGetLocation}
              className="bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              내 위치 허용
            </Button>
          </div>
        ) : (
          <div onClick={handleMapClick}>
            <MapGeolocationComponent location={center} setCenter={setCenter} />
          </div>
        )}
      </Card>
    </section>
  );
};

export default LandingMapPreview;
