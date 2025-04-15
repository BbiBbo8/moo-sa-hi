"use client";

import { useDailyPostDetailQuery } from "@/hooks/community/useDailyPostDetailQuery";
import Image from "next/image";
import { format } from "date-fns";
import Loading from "@/app/(pages)/Loading";
import Error from "@/app/(pages)/Error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import { useEffect, useState } from "react";
import CommentForm from "./form/CommentForm";
import getUserData from "@/supabase/getUserData";

const DailyDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useDailyPostDetailQuery(id);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast("존재하지 않는 페이지입니다.");
      router.push(PATH.COMMUNITYDAILY);
    }
  }, [error, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      console.log("userData", userData);
      const userId = userData.user?.id;
      if (userId) {
        setCurrentUser(userId);
      }
    };
    fetchUserData();
  }, []);

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
      {toggleConfirmModal && (
        <>
          <div
            onClick={handleConfirmationModal} // 모달창 외 배경 클릭 시 모달창 닫도록 구현
            className="fixed inset-0 z-10 bg-black/50"
          ></div>
          <article
            onClick={e => e.stopPropagation()} // 모달창을 클릭해도 닫히기 않게 방지
            className="fixed top-1/2 left-1/2 z-20 flex h-[128px] w-[312px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded-xl border-2 bg-white text-gray-500"
          >
            게시글을 신고하시겠습니까?
            <article className="flex flex-row gap-2 font-semibold text-black [&>*]:active:border-[#58999E] [&>*]:active:text-[#58999E]">
              <button
                type="button"
                onClick={handleConfirmationModal}
                className="h-[44px] w-[140px] rounded-lg border-1 border-gray-400"
              >
                닫기
              </button>
              {currentUser === data.user ? (
                <button className="h-[44px] w-[140px] rounded-lg border-1 border-gray-400">
                  삭제하기
                </button>
              ) : (
                <button className="h-[44px] w-[140px] rounded-lg border-1 border-gray-400">
                  신고하기
                </button>
              )}
            </article>
          </article>
        </>
      )}

      {/* TEST: 화면에 보이는 회색 줄 부분입니다. 임시로 div태그를 사용했지만 이후 바뀔 예정입니다. 무슨 태그가 좋을까요? */}
      <div className="h-4 min-w-screen bg-gray-200"></div>

      <aside className="w-full pb-20">
        <CommentForm />
      </aside>
    </section>
  );
};
export default DailyDetailPost;
