import { create } from 'zustand';
import { fetchShelters } from '../api/fetchSheltersApi';
import { Shelter } from '../types/shelter'; 

interface ShelterStore {
  shelters: Shelter[]; // 대피소 데이터 배열
  error: string | null; // 에러 메시지
  fetchSheltersData: () => Promise<void>; // API 호출 함수
}

// 스토어 생성
export const useShelterStore = create<ShelterStore>((set) => ({
  shelters: [],
  error: null,

  fetchSheltersData: async () => {
    try {
      const data = await fetchShelters();
      set({ shelters: data });
    } catch (err: any) {
      set({ error: err.message || '데이터 호출 실패' });
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