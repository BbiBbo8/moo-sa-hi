"use server";

import axios from "axios";
import { NewsItem } from "@/types/news";

const fetchNewsDetailApi = async (newsId: string): Promise<NewsItem | null> => {
  const apiKey = process.env.NEXT_NEWS_API_KEY!;
  const apiBase = process.env.NEXT_NEWS_API_BASE_URL!;
  const detailEndpoint = `${apiBase}`;

  try {
    const res = await axios.get(detailEndpoint, {
      params: {
        serviceKey: apiKey,
        returnType: "json",
        YNA_NO: newsId,
      },
    });

    // API 응답 구조에 따라 상세 뉴스 데이터 추출
    const item = res.data?.body?.[0]; // body 배열의 첫 번째 요소가 상세 정보라고 가정
    if (item) {
      return {
        id: item.YNA_NO,
        title: item.YNA_TTL,
        description: item.YNA_CN,
        date: item.YNA_YMD,
        writer: item.YNA_WRTR_NM,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
};

export default fetchNewsDetailApi;