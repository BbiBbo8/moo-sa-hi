import { Shelter } from "@/types/shelter";
import { create } from "zustand";

interface MarkerState {
  checkShelters: Shelter[];
  setCheckShelters: (shelters: Shelter[]) => void;
}

export const useMarkerStore = create<MarkerState>(set => ({
  // 리스트에 표시될 마커 배열, 초기 상태
  checkShelters: [],
  // 대피소 목록을 설정하는 함수(외부에서 이걸 호출해서 상태를 변경)
  // 매개변수 shelters는 새로운 대피소 배열
  setCheckShelters: shelters => set({ checkShelters: shelters }),
}));
