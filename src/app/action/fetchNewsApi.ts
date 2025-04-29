"use server";

import axios from "axios";
import { NewsItem } from "@/types/news";
import page from "../(pages)/news/[id]/page";

const fetchNewsApi = async (): Promise<NewsItem[]> => {
  const apiKey = process.env.NEXT_NEWS_API_KEY!;
  const apiBase = process.env.NEXT_NEWS_API_BASE_URL!;

  const res = await axios.get(apiBase, {
    params: {
      serviceKey: apiKey,
      returnType: "json",
      pageNo: 2885, // 2885페이지부터 최신 데이터 (추후에 자동으로 최신화 방법 찾기)
      numofRows: 1000,
      sort: "YNA_YMD", // 또는 YNA_YMD 등 날짜 관련 필드명
      order: "desc", // 내림차순 (최신순)
    },
  });
  const items = res.data.body;
  console.log(items);
  if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

  const filtered = items.map(item => ({
    id: item.YNA_NO, // 고유 id
    title: item.YNA_TTL, // 제목
    description: item.YNA_CN, // 내용
    date: item.YNA_YMD, // 날짜
    writer: item.YNA_WRTR_NM, // 작성자
  }));
  return filtered;
};
export default fetchNewsApi;