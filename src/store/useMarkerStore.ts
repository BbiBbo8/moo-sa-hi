import { Shelter } from "@/types/shelter";
import { create } from "zustand";

interface MarkerState {
  markedShelter: Shelter[];
  setMarkedShelter: (shelters: Shelter[]) => void;

  // 사용자가 마커를 선택한 대피소의 이름을 저장, 선택된 대피소가 없으면 null 처리
  selectedShelterName: string | null;

  // Name 상태를 업데이트하는 함수
  setSelectedShelterName: (name: string | null) => void;
}

export const useMarkerStore = create<MarkerState>(set => ({
  markedShelter: [],
  setMarkedShelter: shelters => set({ markedShelter: shelters }),

  // 마커 선택되지 않았을경우 대피소는 초기값 null 처리
  selectedShelterName: null,

  // 특정 대피소를 선택했을 때 상태를 업데이트 함.
  setSelectedShelterName: name => set({ selectedShelterName: name }),
}));
