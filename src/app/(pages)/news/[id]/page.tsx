"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchNewsDetailApi from "@/app/action/fetchNewsDetailApi";
import Loading from "@/app/(pages)/Loading";

const NewsDetailPage = () => {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : undefined;

  const { data: newsDetail, isLoading, error } = useQuery({
    queryKey: ["newsDetail", id],
    queryFn: async () => {
      if (!id) return null;
      return fetchNewsDetailApi(id);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center mt-10"><Loading /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-30">상세 뉴스를 불러오는 데 실패했습니다.</div>;
  }

  if (!newsDetail) {
    return <div className="text-center text-gray-500 mt-30">해당 뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 mt-30">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{newsDetail.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{newsDetail.date}</p>
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
        <p>{newsDetail.description}</p>
      </div>
    </div>
  );
};

export default NewsDetailPage;