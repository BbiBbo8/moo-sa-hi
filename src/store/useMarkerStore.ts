import { create } from "zustand";
import { Shelter } from "@/types/shelter";

interface MarkerState {
  markedShelter: Shelter[];
  setMarkedShelter: (shelters: Shelter[]) => void;

  selectedShelterName: string | null;
  setSelectedShelterName: (name: string | null) => void;

  visibleShelters: Shelter[]; // 추가된 상태
  setVisibleShelters: (shelters: Shelter[]) => void; // visibleShelters 업데이트 함수 추가
  userLocation: { lat: number; lng: number } | null; // 사용자 위치
  setUserLocation: (location: { lat: number; lng: number }) => void; // 위치 업데이트 함수
}

export const useMarkerStore = create<MarkerState>(set => ({
  markedShelter: [],
  setMarkedShelter: shelters => set({ markedShelter: shelters }),

  selectedShelterName: null,
  setSelectedShelterName: name => set({ selectedShelterName: name }),

  visibleShelters: [],
  setVisibleShelters: shelters => set({ visibleShelters: shelters }),

  userLocation: null,
  setUserLocation: location => set({ userLocation: location }),
}));
