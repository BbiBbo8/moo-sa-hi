"use client";

import { useGeolocationMutation } from "@/hooks/useMapGeolocation";
import { useState } from "react";
import UserGeolocationMap from "./UserGeolocationMap";

const MapGeolocation = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  // geolocation 훅 가져오기
  const { mutate, isPending, error } = useGeolocationMutation();

  // 현재 위치 가져오기
  const handleGetLocation = () => {
    mutate(undefined, {
      onSuccess: data => {
        setCenter(data);
      },
    });
  };
  return (
    <div>
      {/*  현재 위치 가져오기 버튼 */}
      <button
        onClick={handleGetLocation}
        disabled={isPending}
        style={{ marginBottom: "10px", padding: "8px 12px", cursor: "pointer" }}
        className="rounded-[4px] bg-blue-500 p-5 font-bold text-white"
      >
        {isPending ? "위치 가져오는 중..." : "현재 위치 가져오기"}
      </button>

      {/*  에러 메시지 표시 */}
      {error && <p>위치를 불러올 수 없습니다: {error.message}</p>}

      {/*  위치가 설정된 경우 지도 표시 */}
      {center && <UserGeolocationMap location={center} setCenter={setCenter} />}
      <h1 className="text-2xl font-bold">geolocation 현재 위치 불러오기</h1>
    </div>
  );
};

export default MapGeolocation;
