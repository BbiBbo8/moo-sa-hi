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
import PostButtons from "./PostButtons";

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
    console.log("dailyDetailPost 로딩 에러", error);
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
    <section className="mx-5 mt-5 flex flex-col items-center gap-5">
      <article className="w-full flex-col items-center">
        <header className="mb-7 flex w-full flex-col items-baseline justify-between">
          <h1 className="text-[18px] leading-[27px] font-medium">
            {data.title}
          </h1>
          <div className="flex w-full flex-row justify-between">
            <span className="text-sm text-gray-500">{data.user?.nickname}</span>
            <span className="text-sm text-gray-300">{timeCreated}</span>
          </div>
        </header>

        {data.img_url?.startsWith("http") || data.img_url?.startsWith("/") ? (
          <div className="mb-5 flex items-center justify-center">
            <figure className="relative flex h-[353px] w-[353px] items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-400">
              <Image
                src={data.img_url}
                alt="이미지가 없습니다."
                fill
                className="object-cover"
              />
            </figure>
          </div>
        ) : null}

        <p className="mb-10 min-h-10 w-full text-[16px]">{data.contents}</p>

        <PostButtons
          numOfHelpfuls={data.helpfulCount}
          onClickReport={handleConfirmationModal}
        />
      </article>

      {/* 모달창 */}
      <ConfirmModal
        id={id}
        onOpen={toggleConfirmModal}
        onClose={handleConfirmationModal}
      />

      {/* NOTE: 화면에 보이는 회색 줄 */}
      <div className="mb-11 h-2 min-w-screen bg-[#F7F7F7]"></div>
    </section>
  );
};
export default DailyDetailPost;
