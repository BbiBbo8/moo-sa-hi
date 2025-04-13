"use client";

import useShelterPostDetailQuery from "@/utils/ShelterPostDetailsQuery";
import Image from "next/image";

const ShelterPostDetail = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null;

  const createdAt = new Date(data.created_at);
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");
  const formattedDate = `${createdAt.getFullYear()}.${month}.${day}`;

  const imageUrl = data.img_url || "/shorty.jpeg"; // 기본 이미지

  return (
    <div>
      <h1>{data.title}</h1>
      <span>{formattedDate}</span>
      <Image src={imageUrl} alt="이미지 없음" width={400} height={300} />
      <p>{data.contents}</p>
    </div>
  );
};

export default ShelterPostDetail;
