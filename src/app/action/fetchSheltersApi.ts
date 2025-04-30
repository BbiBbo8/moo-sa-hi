"use server";

import convertDMSToDecimal from "@/lib/convertDMS";
import axios from "axios";
import { Shelter } from "@/types/shelter";

const fetchSheltersApi = async (): Promise<Shelter[]> => {
  const apiKey = process.env.NEXT_SHELTER_API_KEY!;
  const apiBase = process.env.NEXT_SHELTER_API_BASE_URL!;

  const res = await axios.get(apiBase, {
    params: {
      serviceKey: apiKey,
      returnType: "json",
      numOfRows: 10000,
    },
  });

  const items = res.data.body;
  if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

  
  const filtered = items
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
