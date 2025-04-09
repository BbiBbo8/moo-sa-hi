import axios from 'axios';
import { Shelter } from '@/types/shelter';

// 도/분/초 -> 실수형 위도/경도 변환 함수
const dmsToDecimal = (deg: string, min: string, sec: string): number => {
  return parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600;
};

// 대피소 API 호출 및 가공 함수
export const fetchShelters = async (): Promise<Shelter[]> => {
  try {
    // Next.js API 라우트 경유 요청
    const res = await axios.get('/api/shelters');

    // 응답에서 대피소 원본 데이터 추출
    const raw = res.data?.body || [];

    // 원본 데이터를 Shelter 타입으로 가공
    const shelters: Shelter[] = raw.map((item: any) => ({
      name: item.FCLT_NM,
      address: item.FCLT_ADDR_LOTNO,
      lat: dmsToDecimal(item.LAT_PROVIN, item.LAT_MIN, item.LAT_SEC),
      lng: dmsToDecimal(item.LOT_PROVIN, item.LOT_MIN, item.LOT_SEC),
    }));

    return shelters;
  } catch (error) {
    console.error('🚨 fetchShelters 실패:', error);
    return [];
  }
};