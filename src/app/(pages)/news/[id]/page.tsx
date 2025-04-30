"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchNewsApi from "@/app/action/fetchNewsApi";
import Loading from "@/app/(pages)/Loading";

const NewsDetailPage = () => {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : undefined;
  
  const { data: newsList, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsApi,
  });

  const newsDetail = newsList?.find((item) => String(item.id) === id);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        상세 뉴스를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (!newsDetail) {
    return (
      <div className="text-center text-gray-500 mt-20">
        해당 뉴스를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-25">
      <h1 className="text-3xl font-bold leading-tight text-[#1A1A1A] mb-4">
        {newsDetail.title}
      </h1>

      <div className="text-sm text-gray-500 mb-8 border-b pb-4">
        <span>{newsDetail.date || "날짜 없음"}</span>
        <span className="mx-2">|</span>
      </div>

      <div className="prose max-w-none text-[17px] leading-8 text-[#333]">
        {newsDetail.description?.split("\n").map((paragraph, i) => (
          <p key={i} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetailPage;