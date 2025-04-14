"use client";

import { useDailyPostDetailQuery } from "@/hooks/community/useDailyPostDetailQuery";
import getUserData from "@/supabase/getUserData";
import { useEffect, useState } from "react";

type params = {
  id: number;
  onOpen: boolean;
  onClose: () => void;
};

const ConfirmModal = ({ id, onOpen, onClose }: params) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { data } = useDailyPostDetailQuery(id);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      const userId = userData.user?.id;
      if (userId) {
        setCurrentUser(userId);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {onOpen && (
        <>
          <div
            onClick={onClose} // 모달창 외 배경 클릭 시 모달창 닫도록 구현
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
                onClick={onClose}
                className="h-[44px] w-[140px] rounded-lg border-1 border-gray-400"
              >
                닫기
              </button>
              {currentUser === data?.user ? (
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
    </>
  );
};

export default ConfirmModal;
