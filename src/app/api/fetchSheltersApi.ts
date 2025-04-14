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
      numOfRows: 1000,
    },
  });

  const items = res.data.body;
  if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

  return items.map(item => ({
    name: item.FCLT_NM,
    address: item.FCLT_ADDR_LOTNO,
    lat: convertDMSToDecimal(item.LAT_PROVIN, item.LAT_MIN, item.LAT_SEC),
    lng: convertDMSToDecimal(item.LOT_PROVIN, item.LOT_MIN, item.LOT_SEC),
  }));
};

export default fetchSheltersApi;
