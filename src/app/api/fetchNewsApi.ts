"use server";

import axios from "axios";

const fetchNewsApi = async () => {
  const apiKey = process.env.NEXT_NEWS_API_KEY!;
  const apiBase = process.env.NEXT_NEWS_API_BASE_URL!;

  const res = await axios.get(apiBase, {
    params: {
      serviceKey: apiKey,
      returnType: "json",
      numofRows: 1000,
    },
  });
  const items = res.data.articles;
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