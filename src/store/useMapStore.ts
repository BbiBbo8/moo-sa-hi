import { create } from "zustand";

interface MapStore {
  center: { lat: number; lng: number };
  level: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setLevel: (level: number) => void;
  reset: () => void;
}

const initialCenter = { lat: 36.5, lng: 127.5 }; // 대한민국 중심
const initialLevel = 13;

export const useMapStore = create<MapStore>(set => ({
  center: initialCenter,
  level: initialLevel,
  setCenter: center => set({ center }),
  setLevel: level => set({ level }),
  reset: () => set({ center: initialCenter, level: initialLevel }),
}));
