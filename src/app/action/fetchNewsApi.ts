"use server";

import axios from "axios";
import { NewsItem } from "@/types/news";

const fetchNewsApi = async (): Promise<NewsItem[]> => {
  const apiKey = process.env.NEXT_NEWS_API_KEY!;
  const apiBase = process.env.NEXT_NEWS_API_BASE_URL!;

  try {
    // 알려진 최신 페이지부터 시작
    let currentPage = 2902;
    let latestPage = currentPage;
    let hasMorePages = true;
    
    // 더 높은 페이지 번호 탐색 (최대 10페이지까지만 탐색)
    while (hasMorePages && currentPage < latestPage + 10) {
      try {
        const res = await axios.get(apiBase, {
          params: {
            serviceKey: apiKey,
            returnType: "json",
            pageNo: currentPage + 1, // 다음 페이지 확인
            numofRows: 10, // 테스트를 위해 적은 수의 데이터만 가져옴
            sort: "YNA_YMD",
            order: "desc",
          },
        });
        
        const items = res.data.body;
        
        // 데이터가 있으면 최신 페이지 업데이트
        if (Array.isArray(items) && items.length > 0) {
          latestPage = currentPage + 1;
          currentPage++;
          console.log(`페이지 ${latestPage}에 데이터가 있습니다.`);
        } else {
          // 데이터가 없으면 탐색 종료
          hasMorePages = false;
        }
      } catch (error) {
        console.log(`페이지 ${currentPage + 1}에 액세스할 수 없습니다.`);
        hasMorePages = false;
      }
    }
    
    console.log(`발견된 최신 페이지: ${latestPage}`);
    
    // 최신 페이지에서 실제 데이터 가져오기
    const finalRes = await axios.get(apiBase, {
      params: {
        serviceKey: apiKey,
        returnType: "json",
        pageNo: latestPage,
        numofRows: 1000,
        sort: "YNA_YMD",
        order: "desc",
      },
    });
    
    const items = finalRes.data.body;
    if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

    const filtered = items.map(item => ({
      id: item.YNA_NO,
      title: item.YNA_TTL,
      description: item.YNA_CN,
      date: item.YNA_YMD,
      writer: item.YNA_WRTR_NM,
    }));

    return filtered;
  } catch (error) {
    console.error("뉴스 API 요청 오류:", error);
    
    // 오류 발생 시 기본 페이지(2902)로 폴백
    try {
      const fallbackRes = await axios.get(apiBase, {
        params: {
          serviceKey: apiKey,
          returnType: "json",
          pageNo: 2902, // 알려진 작동하는 페이지로 폴백
          numofRows: 1000,
          sort: "YNA_YMD", 
          order: "desc",
        },
      });
      
      const items = fallbackRes.data.body;
      if (!Array.isArray(items)) throw new Error("데이터 형식 오류");

      const filtered = items.map(item => ({
        id: item.YNA_NO,
        title: item.YNA_TTL,
        description: item.YNA_CN,
        date: item.YNA_YMD,
        writer: item.YNA_WRTR_NM,
      }));

      return filtered;
    } catch (fallbackError) {
      console.error("폴백 요청도 실패:", fallbackError);
      throw error; // 원래 에러 전달
    }
  }
};

export default fetchNewsApi;