import axios from 'axios';
import { Shelter } from '@/types/shelter';

// 위도/경도 도,분,초를 실수형 위도/경도로 변환(10진수)
const dmsToDecimal = (deg: string, min: string, sec: string): number => {
  return (
    parseFloat(deg) +
    parseFloat(min) / 60 +
    parseFloat(sec) / 3600
  );
};

// api 호출하여 데이터 받아오기
export const fetchShelters = async (): Promise<Shelter[]> => {
  try {
    const res = await axios.get(
      'https://www.safetydata.go.kr/V2/api/DSSP-IF-00195',
      {
        params: {
          serviceKey: '68E27K47S9W1D8II',
          returnType: 'json',
        },
      }
    );

    const shelters = res.data?.data || [];

    // 데이터 가공
    const parsedShelters: Shelter[] = shelters.map((item: any) => ({
      name: item.FCLT_NM, // 시설명
      address: item.FCLT_ADDR_LOTNO, // 시설 주소 지번
      lat: dmsToDecimal(item.LAT_PROVIN, item.LAT_MIN, item.LAT_SEC), // 위도
      lng: dmsToDecimal(item.LOT_PROVIN, item.LOT_MIN, item.LOT_SEC), // 경도
    }));

    return parsedShelters;
  } catch (error) {
    console.error('API 호출 또는 데이터 가공 실패:', error);
    return [];
  }
};