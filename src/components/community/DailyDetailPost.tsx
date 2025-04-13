"use client";

import { useDailyPostDetailQuery } from "@/hooks/community/useDailyPostDetailQuery";
import Image from "next/image";
import { format } from "date-fns";

const DailyDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useDailyPostDetailQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null; // <= 이거 추가

  const formatted = format(new Date(data.created_at), "yyyy.MM.dd");

  return (
    <main>
      <h1 className="text-[20px]">{data.title}</h1>
      <span>{formatted}</span>
      {/* <Image
        src={data.img_url || ""}
        alt="이미지가 없습니다."
        width={300}
        height={200}
      /> */}
      <p>{data.contents}</p>
    </main>
  );
};
export default DailyDetailPost;
