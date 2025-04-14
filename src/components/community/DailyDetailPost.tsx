"use client";

import { useDailyPostDetailQuery } from "@/hooks/community/useDailyPostDetailQuery";
import Image from "next/image";
import { format } from "date-fns";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import { useEffect } from "react";

const DailyDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useDailyPostDetailQuery(id);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast("존재하지 않는 페이지입니다.");
      router.push(PATH.COMMUNITYDAILY);
    }
  }, [error, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!data) {
    return null;
  }

  const timeCreated = format(new Date(data.created_at), "yyyy.MM.dd");

  return (
    <main className="m-4 flex flex-col items-center gap-5">
      <section className="mb-5 w-full flex-col gap-5 not-visited:flex">
        <section className="flex flex-row items-baseline justify-between">
          <h1 className="text-[20px]">{data.title}</h1>
          <span className="text-[14px] text-gray-500">{timeCreated}</span>
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
          {data.contents}
        </p>
      </section>

      {/* TEST: 화면에 보이는 회색 줄 부분입니다. 임시로 div태그를 사용했지만 이후 바뀔 예정입니다. 무슨 태그가 좋을까요? */}
      <div className="h-4 min-w-screen bg-gray-200"></div>

      <section>댓글이 들어갈 공간</section>
    </main>
  );
};
export default DailyDetailPost;
