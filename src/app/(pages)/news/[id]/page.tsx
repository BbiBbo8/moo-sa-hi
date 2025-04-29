"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchNewsDetailApi from "@/app/action/fetchNewsDetailApi";

const NewsDetailPage = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : undefined;

  const { data: newsDetail, isLoading, error } = useQuery({
    queryKey: ["newsDetail", id],
    queryFn: async () => {
      if (!id) return null;
      return fetchNewsDetailApi(id);
    },
    enabled: !!id, // id가 존재할 때만 쿼리 실행
  });

  if (isLoading) {
    return <div>상세 뉴스를 불러오는 중...</div>;
  }

  if (error) {
    return <div>상세 뉴스를 불러오는 데 실패했습니다.</div>;
  }

  if (!newsDetail) {
    return <div>해당 뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl py-8 px-4 sm:px-6 lg:px-8 py-25">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{newsDetail.title}</h1>
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <span>{newsDetail.date}</span>
        <span className="mx-2">•</span>
        <span>{newsDetail.writer}</span>
      </div>
      <div className="text-gray-800 leading-relaxed">{newsDetail.description}</div>
    </div>
  );
};

export default NewsDetailPage;