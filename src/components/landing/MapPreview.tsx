"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapGeolocationComponent from "@/components/map/UserGeolocationMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PATH from "@/constants/PATH";

const DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

const LandingMapPreview = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
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
    <section className="mx-4 py-8">
      {/* overflow-hidden 삭제 or 수정 */}
      <Card className="p-0">
        <div className="space-y-1 px-4 py-3">
          <h2 className="text-lg font-bold">주변 대피소 확인</h2>
          <p className="text-muted-foreground text-sm">
            재난 시 피신할 대피소를 미리 확인!
          </p>
        </div>

        <div className="relative">
          {/* 지도 */}
          <MapGeolocationComponent location={center} setCenter={setCenter} />

          {/* GPS 버튼 - 왼쪽 하단 */}
          <button
            onClick={handleGetLocation}
            className="absolute bottom-4 left-4 z-50 rounded-full bg-white p-2 shadow-md"
            aria-label="내 위치로 이동"
          >
            <img
              src="/icons/gps.svg"
              alt="내 위치 아이콘"
              className="h-5 w-5"
            />
          </button>

          {/* 지역 검색하기 버튼 - 중앙 하단 */}
          <Button
            onClick={handleMapClick}
            className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-[#58999E] px-6 py-2 font-semibold text-white shadow-md"
          >
            지역 검색하기
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default LandingMapPreview;
