"use client";
import { useMapStore } from "@/store/useMapStore";
import { useEffect } from "react";
import { useShelters } from "./shelter/useShelters";

// zustand의 Map과 shelter 데이터 동기화 하는 커스텀 훅
export const useShelterMapEffect = () => {
  const { data: shelters = [], isLoading, isError } = useShelters();
  const setCenter = useMapStore(state => state.setCenter);

  // shelter 데이터가 로드된 후 shelter를 지도의 중심(center)으로 설정
  // shelter 배열의 첫 번째 항목이 존재할 경우, 해당 위치로 지도를 이동
  useEffect(() => {
    if (shelters.length > 0) {
      const shelter = shelters[0];
      setCenter({ lat: shelter.lat, lng: shelter.lng });
    }
  }, [shelters, setCenter]);

  // 로딩 상태나 에러 상태 처리
  useEffect(() => {
    if (isLoading) {
      console.log("데이터 로딩 중...");
    }

    if (isError) {
      throw new Error("shelter 데이터를 불러오지 못했습니다.");
    }
  }, [isLoading, isError]);
};
