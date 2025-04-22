import { create } from "zustand";
import { Shelter } from "@/types/shelter";

interface MarkerState {
  markedShelter: Shelter[];
  setMarkedShelter: (shelters: Shelter[]) => void;

  selectedShelterName: string | null;
  setSelectedShelterName: (name: string | null) => void;

  visibleShelters: Shelter[]; // 추가된 상태
  setVisibleShelters: (shelters: Shelter[]) => void; // visibleShelters 업데이트 함수 추가
}

export const useMarkerStore = create<MarkerState>(set => ({
  markedShelter: [],
  setMarkedShelter: shelters => set({ markedShelter: shelters }),

  selectedShelterName: null,
  setSelectedShelterName: name => set({ selectedShelterName: name }),

  visibleShelters: [],
  setVisibleShelters: shelters => set({ visibleShelters: shelters }),
}));
