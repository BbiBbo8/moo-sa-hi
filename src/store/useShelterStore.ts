import { create } from "zustand";
import { Shelter } from "@/types/shelter";
import fetchSheltersApi from "@/app/action/fetchSheltersApi";

interface ShelterStore {
  shelters: Shelter[];
  error: string | null;
  fetchSheltersData: () => Promise<void>;
}

export const useShelterStore = create<ShelterStore>(set => ({
  shelters: [],
  error: null,
  fetchSheltersData: async () => {
    const data = await fetchSheltersApi();
    set(prev => ({
      ...prev,
      shelters: data,
      error: null,
    }));
  },
}));
