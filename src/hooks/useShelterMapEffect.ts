"use client";
import { useMapStore } from "@/store/useMapStore";
import { useEffect } from "react";
import { useShelters } from "./shelter/useShelters";

// zustand의 Map과 shelter 데이터 동기화 하는 커스텀 훅
export const useShelterMapEffect = () => {
  const { data: shelters = [] } = useShelters();
  const setCenter = useMapStore(state => state.setCenter);

  // shelter 데이터가 로드된 후 shelter를 지도의 중심(center)으로 설정
  // shelter 배열의 첫 번째 항목이 존재할 경우, 해당 위치로 지도를 이동
  useEffect(() => {
    if (shelters.length > 0) {
      const shelter = shelters[0];
      setCenter({ lat: shelter.lat, lng: shelter.lng });
    }
  }, [shelters, setCenter]);
};
