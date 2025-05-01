"use server";

import axios from "axios";
import { DisasterAlert } from "@/types/disaster";

const fetchDisasterAlert = async (): Promise<DisasterAlert[]> => {
  const apiKey = process.env.NEXT_DISASTER_API_KEY!;
  const apiBase = process.env.NEXT_DISASTER_API_BASE_URL!;

  const res = await axios.get(apiBase, {
    params: {
      serviceKey: apiKey,
      pageNo: 31, //30페이지부터 최신 데이터 (추후에 자동으로 최신화 방법 찾기)
      returnType: "json",
      numOfRows: 1000,
    },
  });

  const items = res.data.body;
  if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

  const filtered = items
    .filter(item => item.DST_SE_NM !== "기타")
    .map(item => ({
      id: item.SN,
      message: item.MSG_CN,
      createdAt: item.CRT_DT,
      region: item.RCPTN_RGN_NM,
      disasterType: item.DST_SE_NM,
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return filtered;
};

export default fetchDisasterAlert;