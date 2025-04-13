"use client";

import useShelterPostDetailQuery from "@/utils/shelterPostDetailsQuery";
import Image from "next/image";
import { format } from "date-fns";

const ShelterDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null;

  const timeCreated = format(new Date(data.created_at), "yyyy.MM.dd");

  // const imageUrl = data.img_url || "/shorty.jpeg"; // 현재 이미지 관련에서 오류가 지속적으로 생겨서 잠시 주석 처리를 해놓은 상태입니다

  return (
    <main className="m-4 flex flex-col">
      <h1 className="text-5xl">{data.title}</h1>
      <span>{timeCreated}</span>
      {/* <Image src={imageUrl} alt="이미지 없음" width={400} height={300} /> */}
      <p>내용: {data.contents}</p>
      <span>혼잡도: {data.people}</span>
      <span>위생상태: {data.cleanliness}</span>
      <span>구호품: {data.supplies}</span>
    </main>
  );
};

export default ShelterDetailPost;
