import { Shelter } from "@/types/shelter";
import { useMemo } from "react";

export const useDistance = (
  userLocation: { lat: number; lng: number },
  shelters: Shelter[],
) => {
  return useMemo(() => {
    if (!userLocation || !shelters.length) return [];

    return shelters.map(shelter => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        shelter.lat,
        shelter.lng,
      );

      return {
        ...shelter,
        distance: Math.round(distance), // 미터 단위
      };
    });
  }, [userLocation, shelters]);
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371e3; // 지구 반지름 (단위: 미터)

  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 최종 거리 (단위: 미터)
  return distance;
};
