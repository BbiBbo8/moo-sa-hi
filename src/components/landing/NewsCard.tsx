"use client";

import React from "react";
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
import { useQuery } from "@tanstack/react-query";

const NewsCard = () => {
  const {
    data: newsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const news = await fetchNewsApi();
      return news.slice(0, 5); // 최신 뉴스 5개만 가져오기
    },
    refetchInterval: 60000, // 1분마다 자동으로 refetch
  });

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
          <div className="text-center text-red-500">
            뉴스를 불러오는 데 실패했습니다.
          </div>
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
          {newsData?.map((news) => (
            <Card
              key={news.id}
              className="max-w-[300px] min-w-[300px] flex-shrink-0 bg-[#F7F7F7] flex flex-col"
            >
              <Link
                href={`/news/${news.id}`}
                className="block flex-grow" // 남은 공간을 채우도록 설정
              >
                <CardHeader className="pb-2">
                  <CardTitle className="truncate">{news.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-4">
                    {news.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Link>
              <CardFooter className="text-xs">{news.date} | {news.writer}</CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsCard;