import { create } from "zustand";

interface MapState {
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: { lat: 37.502322, lng: 127.044474 }, // 기본 좌표 (lat:위도 lng: 경도)
  setCenter: (center) => set({ center }), // 새로운 객체로 상태 변경
}));
