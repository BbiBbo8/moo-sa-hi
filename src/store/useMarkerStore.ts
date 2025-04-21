import { Shelter } from "@/types/shelter";
import { create } from "zustand";

interface MarkerState {
  markedShelter: Shelter[];
  setMarkedShelter: (shelters: Shelter[]) => void;

  selectedShelterName: string | null;
  setSelectedShelterName: (name: string | null) => void;
}

export const useMarkerStore = create<MarkerState>(set => ({
  markedShelter: [],
  setMarkedShelter: shelters => set({ markedShelter: shelters }),

  selectedShelterName: null,
  setSelectedShelterName: name => set({ selectedShelterName: name }),
}));
