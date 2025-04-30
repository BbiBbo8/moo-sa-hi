"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapGeolocationComponent from "@/components/map/UserGeolocationMap";
import { Button } from "@/components/ui/button";
import PATH from "@/constants/PATH";
import Image from "next/image";
import gps from "/public/icons/gps.svg";

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
    <section className="mx-[20px] mt-8">
      {/* 텍스트 헤더 */}
      <div className="mb-4">
        <h2 className="text-[20px] leading-[27px] font-semibold text-[#1A1A1A]">
          주변 대피소 확인
        </h2>
        <p className="mt-1 text-[16px] text-[#666666]">
          재난 시 피신할 대피소를 미리 확인!
        </p>
      </div>

      {/* 지도 + 버튼 영역 */}
      <div className="relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-lg">
        <MapGeolocationComponent location={center} setCenter={setCenter} />

        {/* GPS 버튼 */}
        <button
          onClick={handleGetLocation}
          className="absolute bottom-[80px] left-4 z-50 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/90 p-2 shadow-md backdrop-blur-sm"
          aria-label="내 위치로 이동"
        >
          <Image src={gps} alt="내 위치 아이콘" width={20} height={20} />
        </button>

        {/* 지역 검색하기 버튼 */}
        <Button
          onClick={handleMapClick}
          className="absolute bottom-4 left-1/2 z-40 h-12 w-[calc(100%-32px)] -translate-x-1/2 rounded-lg bg-[#2889E4] text-base font-medium text-white shadow-md"
        >
          지역 검색하기
        </Button>
      </div>
    </section>
  );
};

export default LandingMapPreview;
