import axios from 'axios';
import { Shelter } from '@/types/shelter';

export const fetchShelters = async (): Promise<Shelter[]> => {
  try {
    const res = await axios.get('/api/shelters'); // 로컬 API 라우트 경유
    console.log('API 원본 응답:', res.data); 
    const shelters = res.data?.data || [];

    const dmsToDecimal = (deg: string, min: string, sec: string): number => {
      return parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600;
    };

    return shelters.map((item: any) => ({
      name: item.FCLT_NM,
      address: item.FCLT_ADDR_LOTNO,
      lat: dmsToDecimal(item.LAT_PROVIN, item.LAT_MIN, item.LAT_SEC),
      lng: dmsToDecimal(item.LOT_PROVIN, item.LOT_MIN, item.LOT_SEC),
    }));
  } catch (error) {
    console.error('API 호출 또는 데이터 가공 실패:', error);
    return [];
  }
};