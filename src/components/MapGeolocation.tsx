"use client";
import MapComponent from "./MapComponent";
import { usefetchuseGeolocationMutation } from "@/hooks/useGeolocation";

import { useState } from "react";

export default function MapGeolocation() {
  // 지도 중심 상태를 부모에서 관리
  // center는 현재 지도 중심 좌표를 저장함, 초기값은 null
  // setCenter 를 사용하여 위치 데이터 업데이트
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Mutation 훅 사용
  const { mutate, isPending, error } = usefetchuseGeolocationMutation();

  //  현재 위치 가져오기
  const handleGetLocation = () => {
    mutate(undefined, {
      // undefined이유 "그냥 실행해라" 브라우저가 제공해주기 때문에
      onSuccess: (data) => {
        setCenter(data); // ✅ 위치 데이터를 가져오면 center 업데이트
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
        className="p-5 font-bold text-white bg-blue-500 rounded-[4px]"
      >
        {isPending ? "위치 가져오는 중..." : "현재 위치 가져오기"}
      </button>

      {/*  에러 메시지 표시 */}
      {error && <p>위치를 불러올 수 없습니다: {error.message}</p>}

      {/*  위치가 설정된 경우 지도 표시 */}
      {center && <MapComponent location={center} setCenter={setCenter} />}
      <h1 className="font-bold text-2xl">geolocation 현재 위치 불러오기</h1>
    </div>
  );
}
