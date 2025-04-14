"use client";

import useShelterPostDetailQuery from "@/utils/shelterPostDetailsQuery";
import Image from "next/image";
import { format } from "date-fns";
import Loading from "@/app/(pages)/Loading";
import MainMap from "../map/MainMap";
import { useMapStore } from "@/store/useMapStore";
import { useEffect, useState } from "react";
import { useShelters } from "@/hooks/shelter/useShelters";
import { toast } from "sonner";
import Error from "@/app/(pages)/Error";
import CommentForm from "@/components/community/form/CommentForm";
import getUserData from "@/supabase/getUserData";

const ShelterDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);
  const { setLevel, setCenter } = useMapStore(); // 변경될 좌표와 지도 레벨
  const { data: shelters = [] } = useShelters(); // 대피소 목록 불러오기
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // TODO : 해당 페이지에서 선택된 주소를 기반으로 대피소를 선택해 주소를 zustand에 저장
  // const TEMP_SHELTER_NAME = "청구목욕탕"; // TEST : 임시값 테스트 코드

  useEffect(() => {
    if (shelters.length === 0) {
      console.log("대피소 목록이 비어 있습니다.");
      return;
    }
    const matchedShelter = shelters.find(
      // shelter => shelter.name === TEMP_SHELTER_NAME, // TEST : 임시값 테스트 코드
      shelter => shelter.name === data?.shelter_name,
    );
    if (matchedShelter) {
      setCenter({ lat: matchedShelter.lat, lng: matchedShelter.lng });
      setLevel(4);
      console.log("matchedShelter123", matchedShelter);
    } else {
      console.log("matchedShelter", matchedShelter);
      toast("해당 이름의 대피소를 찾을 수 없어요.");
    }
    // }, [shelters, setCenter, setLevel]); // TEST : 임시값 테스트 코드
  }, [data?.shelter_name, shelters, setCenter, setLevel]); // 현재 값이 없어 전체 지도로만 나옴.

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

  const handleConfirmationModal = () => {
    return setToggleConfirmModal(toggleConfirmModal => !toggleConfirmModal);
  };

  const timeCreated = format(new Date(data.created_at), "yyyy.MM.dd");

  return (
    <section className="m-4 flex flex-col items-center gap-5">
      <article className="mb-5 w-full flex-col gap-5 not-visited:flex">
        <header className="flex flex-col">
          <div className="flex w-full flex-row items-baseline justify-between">
            <h1 className="text-[20px]">{data.title}</h1>
            <span className="text-[14px] text-gray-500">{timeCreated}</span>
          </div>
          <span className="text-[14px] text-gray-500">
            혼잡도: {data.people} 아직 빈칸
          </span>
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
          내용 : {data.contents}
        </p>

        <section className="flex flex-col gap-2">
          <span>혼잡도: {data.people}</span>
          <span>위생상태: {data.cleanliness}</span>
        </section>

        <figure className="flex h-40 overflow-hidden rounded-2xl">
          <MainMap />
        </figure>
      </article>

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

      {/* NOTE: 댓글 section이 화면에 보이지 않아 임시로 스타일을 부여했습니다. */}
    </main>
  );
};

export default ShelterDetailPost;
