"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "../ui/card";
import fetchNewsApi from "@/app/action/fetchNewsApi";
import { NewsItem } from "@/types/news";

const NewsCard = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const news = await fetchNewsApi();
        setNewsData(news.slice(0, 5)); // Get first 5 news items
        setIsLoading(false);
      } catch (err) {
        setError("뉴스를 불러오는데 실패했습니다.");
        setIsLoading(false);
        console.error("News fetching error:", err);
      }
    };

    getNews();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-5">
        <h2 className="text-[20px] leading-[27px] font-semibold text-[#1A1A1A]">
          무사히 재난 뉴스
        </h2>
        <p className="mt-1 text-[16px] text-[#666666]">
          전국 각지에서 일어난 재난 정보
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="text-center">뉴스를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-5">
        <h2 className="text-[20px] leading-[27px] font-semibold text-[#1A1A1A]">
          무사히 재난 뉴스
        </h2>
        <p className="mt-1 text-[16px] text-[#666666]">
          전국 각지에서 일어난 재난 정보
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-[20px]">
      <h2 className="text-[20px] leading-[27px] font-semibold text-[#1A1A1A]">
        무사히 재난 뉴스
      </h2>
      <p className="mt-1 text-[16px] text-[#666666]">
        전국 각지에서 일어난 재난 정보
      </p>
      <section className="overflow-x-auto">
        <div className="flex w-max gap-4 py-[12px]">
          {newsData.map((news) => (
            <Card
              key={news.id}
              className="max-w-[300px] min-w-[300px] flex-shrink-0 bg-[#F7F7F7]"
            >
              <Link href={`/news/${news.id}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="truncate">{news.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-4">
                    {news.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Link>
              <CardFooter className="text-xs">
                {news.date} | {news.writer}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsCard;