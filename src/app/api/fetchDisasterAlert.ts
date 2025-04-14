"use server";

import axios from "axios";

const fetchDisasterAlert = async (): Promise<[]> => {
    const apiKey = process.env.NEXT_DISASTER_API_KEY!;
    const apiBase = process.env.NEXT_DISASTER_API_BASE_URL!;
  
    const res = await axios.get(apiBase, {
      params: {
        serviceKey: apiKey,
        returnType: "json",
        numOfRows: 10,
      },
    });
  
    const items = res.data.body;
    if (!Array.isArray(items)) throw new Error("데이터 형식 오류");
  
  
    return items
    .filter(item => item.DST_SE_NM !== "기타")
    .map(item => ({
      id: item.SN,
      message: item.MSG_CN,
      createdAt: item.CRT_DT,
      region: item.RCPTN_RGN_NM,
      disasterType: item.DST_SE_NM,
    }));
  };
  
  export default fetchDisasterAlert;
  