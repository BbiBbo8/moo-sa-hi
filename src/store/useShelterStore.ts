import { create } from 'zustand';
import { fetchShelters } from '@/app/api/fetchSheltersApi';
import { Shelter } from '@/types/shelter';

interface ShelterStore {
  shelters: Shelter[];
  error: string | null;
  fetchSheltersData: () => Promise<void>;
}

export const useShelterStore = create<ShelterStore>((set) => ({
  shelters: [],
  error: null,
  fetchSheltersData: async () => {
    const data = await fetchShelters();
    console.log('store에서 받은 데이터:', data);
    set((prev) => ({
      ...prev,
      shelters: data,
      error: null,
    }));
  },
}));