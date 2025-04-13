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
    <main className="m-4 flex flex-col items-center gap-5">
      <section className="mb-5 w-full flex-col gap-5 not-visited:flex">
        <section className="flex flex-col">
          <section className="flex w-full flex-row items-baseline justify-between">
            <h1 className="text-[20px]">{data.title}</h1>
            <span className="text-[14px] text-gray-500">{timeCreated}</span>
          </section>
          <span className="text-[14px] text-gray-500">
            혼잡도: {data.people} 아직 빈칸
          </span>
        </section>

        {/* NOTE: 이미지가 여러 개일 때 부모요소 역할을 할 section태그입니다. */}
        <section className="flex items-center justify-center border-2 border-gray-200">
          <figure className="flex h-[350px] w-[350px] items-center justify-center rounded-3xl border-2 border-gray-400">
            이미지
            {/* <Image
          src={data.img_url || ""}
          alt="이미지가 없습니다."
          width={300}
          height={200}
        /> */}
          </figure>
        </section>
        <p className="min-h-20 w-full border-2 border-gray-400">
          내용 : {data.contents}
        </p>
        <section className="flex flex-col gap-2">
          <span>혼잡도: {data.people}</span>
          <span>위생상태: {data.cleanliness}</span>
          <span>구호품: {data.supplies}</span>
        </section>

        <figure className="flex h-40 items-center justify-center rounded-2xl border-2 border-gray-400">
          지도
        </figure>
      </section>

      {/* TEST: 화면에 보이는 회색 줄 부분입니다. 임시로 div태그를 사용했지만 이후 바뀔 예정입니다. 무슨 태그가 좋을까요? */}
      <div className="h-4 min-w-screen bg-gray-200"></div>

      {/* NOTE: 댓글 section이 화면에 보이지 않아 임시로 스타일을 부여했습니다. */}
      <section className="flex w-full items-center justify-center border-2 border-gray-400 py-20">
        댓글이 들어갈 공간
      </section>
    </main>
  );
};

export default ShelterDetailPost;
