import { create } from 'zustand';
import { fetchShelters } from '@/app/api/fetchSheltersApi';
import { Shelter } from '../types/shelter'; 


interface ShelterStore {
  shelters: Shelter[];
  error: string | null;
  fetchSheltersData: () => Promise<void>;
}

export const useShelterStore = create<ShelterStore>((set) => ({
  shelters: [],
  error: null,

  fetchSheltersData: async () => {
    try {
      const data = await fetchShelters();
      set({ shelters: data, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : '데이터 호출 실패';
      set({ shelters: [], error: message });
    }
  },
}));
/**
 * [사용법]
 * 
 * import { useShelterStore } from "@/store/useShelterStore";
 * 
 * const { shelters, error, fetchSheltersData } = useShelterStore();
 * 
 * // useEffect 내부에서 호출:
 * fetchSheltersData(); 
 * 
 * // shelters 배열을 기반으로 지도 마커 표시:
 * shelters.map((shelter) => (
 *   <MapMarker
 *     key={shelter.name}
 *     position={{ lat: shelter.lat, lng: shelter.lng }}
 *     title={shelter.name}
 *   />
 * ));
 */