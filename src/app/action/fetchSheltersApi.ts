"use server";

import convertDMSToDecimal from "@/lib/convertDMS";
import axios from "axios";
import { Shelter } from "@/types/shelter";

const fetchSheltersApi = async (): Promise<Shelter[]> => {
  const apiKey = process.env.NEXT_SHELTER_API_KEY!;
  const apiBase = process.env.NEXT_SHELTER_API_BASE_URL!;
  
  // 최대 데이터 개수 제한
  const MAX_ITEMS = 3000;
  
  // 모든 대피소 데이터를 저장할 배열
  let allItems: any[] = [];
  let currentPage = 1;
  let hasMoreData = true;
  
  while (hasMoreData && allItems.length < MAX_ITEMS) {
    try {
      const res = await axios.get(apiBase, {
        params: {
          serviceKey: apiKey,
          returnType: "json",
          numOfRows: 1000,
          pageNo: currentPage,
        },
      });
      
      const items = res.data.body;
      
      if (!Array.isArray(items) || items.length === 0) {
        hasMoreData = false;
      } else {
        // 남은 공간에 맞게 데이터 추가
        const remainingSpace = MAX_ITEMS - allItems.length;
        const itemsToAdd = items.slice(0, remainingSpace);
        allItems = [...allItems, ...itemsToAdd];
        
        console.log(`페이지 ${currentPage} 데이터 ${itemsToAdd.length}개 추가, 총 ${allItems.length}개`);
        
        // 다음 페이지로 이동
        currentPage++;
        
        // 최대 개수에 도달하거나 마지막 페이지에 도달한 경우
        if (allItems.length >= MAX_ITEMS || items.length < 1000) {
          hasMoreData = false;
        }
      }
    } catch (error) {
      console.error(`페이지 ${currentPage} 요청 오류:`, error);
      hasMoreData = false;
    }
  }
  
  const filtered = allItems
    //SCL_UNIT t(톤) 필터링
    .filter(item => item.SCL_UNIT !== "t(톤)")
    .map(item => ({
      id: `${item.SGG_CD}_${item.FCLT_CD}`, // 대피소 고유 id
      name: item.FCLT_NM, //시설명
      address: item.FCLT_ADDR_LOTNO, //시설주소지번
      addressRoad: item.FCLT_ADDR_RONA, //시설주소도로명
      lat: convertDMSToDecimal(item.LAT_PROVIN, item.LAT_MIN, item.LAT_SEC), // 위도
      lng: convertDMSToDecimal(item.LOT_PROVIN, item.LOT_MIN, item.LOT_SEC), // 경도
      capacity: item.SHNT_PSBLTY_NOPE, // 대피가능인원수
      scale: `${item.FCLT_SCL}${item.SCL_UNIT}`, // 시설규모
      manager: item.MNG_INST_NM, // 관리기관명
      phone: item.MNG_INST_TELNO, // 관리기관전화번호
      locationType: item.GRND_UDGD_SE, // 지상지하구분
      isOpen: item.OPN_YN, // 개방여부
      usageType: item.ORTM_UTLZ_TYPE, // 평상시활용유형
    }));
  return filtered;
};

export default fetchSheltersApi;
