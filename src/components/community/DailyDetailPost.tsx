"use client";

import { useDailyPostDetailQuery } from "@/hooks/community/useDailyPostDetailQuery";
import Image from "next/image";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { formatTime } from "@/utils/formatTime";

const DailyDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useDailyPostDetailQuery(id);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const router = useRouter();

  // TODO: 추후 react-query로 리팩토링하면 좋을 것 같다는 피드백 받음
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

  const timeCreated = formatTime({ time: data.created_at });

  const handleConfirmationModal = () => {
    return setToggleConfirmModal(toggleConfirmModal => !toggleConfirmModal);
  };

  return (
    <section className="m-4 flex flex-col items-center gap-5">
      <article className="mb-5 w-full flex-col items-center gap-5 not-visited:flex">
        <header className="flex w-full flex-row items-baseline justify-between">
          <h1 className="text-[20px]">{data.title}</h1>
          <span className="text-[14px] text-gray-500">{timeCreated}</span>
        </header>

        <div className="flex items-center justify-center">
          <figure className="flex h-[350px] w-[350px] items-center justify-center rounded-3xl border-2 border-gray-400">
            이미지
            {/* <Image
        src={data.img_url || ""}
        alt="이미지가 없습니다."
        width={300}
        height={200}
      /> */}
          </figure>
        </div>

        <p className="min-h-20 w-full border-2 border-gray-400">
          {data.contents}
        </p>

        <button className="flex h-[40px] w-[120px] items-center justify-center rounded-sm bg-gray-200 text-sm">
          유용해요
        </button>
        <button
          type="button"
          onClick={handleConfirmationModal}
          className="justify-en items-end bg-blue-200 px-2 py-1 text-[12px]"
        >
          신고하기
        </button>
      </article>
      {/* 모달창 */}
      <ConfirmModal
        id={id}
        onOpen={toggleConfirmModal}
        onClose={handleConfirmationModal}
      />
      <div className="h-4 min-w-screen bg-gray-200"></div>{" "}
      {/* NOTE: 화면에 보이는 회색 줄 */}
    </section>
  );
};
export default DailyDetailPost;
