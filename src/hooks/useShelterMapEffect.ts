"use client";
import { useMapStore } from "@/store/useMapStore";
import { useShelterStore } from "@/store/useShelterStore";
import { useEffect } from "react";

// zustand의 Map과 shelter 데이터 동기화 하는 커스텀 훅
export const useShelterMapEffect = () => {
  const { shelters, fetchSheltersData } = useShelterStore();
  const setCenter = useMapStore(state => state.setCenter);

  // 컴포넌트가 처음 마운트될 때 shelter 데이터를 가져온다.
  // useShelterStore에서 가져온 함수를 shelter 데이터를 상태에 저장
  useEffect(() => {
    fetchSheltersData();
  }, [fetchSheltersData]);

  // shelter 데이터가 로드된 후 shelter를 지도의 중심(center)으로 설정
  // shelter 배열의 첫 번째 항목이 존재할 경우, 해당 위치로 지도를 이동
  useEffect(() => {
    if (shelters.length > 0) {
      const shelter = shelters[0];
      setCenter({ lat: shelter.lat, lng: shelter.lng });
    }
  }, [shelters, setCenter]);
};
