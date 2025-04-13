"use client";

import useShelterPostDetailQuery from "@/utils/ShelterPostDetailsQuery";
import Image from "next/image";
import { format } from "date-fns";

const ShelterPostDetail = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null;

  const formatted = format(new Date(post.created_at), "yyyy.MM.dd");

  const imageUrl = data.img_url || "/shorty.jpeg"; // 기본 이미지

  return (
    <div>
      <h1>{data.title}</h1>
      <span>{formatted}</span>
      <Image src={imageUrl} alt="이미지 없음" width={400} height={300} />
      <p>{data.contents}</p>
    </div>
  );
};

export default ShelterPostDetail;
