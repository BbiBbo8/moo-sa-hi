"use client";

import useShelterPostDetailQuery from "@/utils/shelterPostDetailsQuery";
import Image from "next/image";
import { formatTime } from "@/utils/formatTime";
import Loading from "@/app/(pages)/Loading";
import MainMap from "../../map/MainMap";
import { useMapStore } from "@/store/useMapStore";
import { useEffect, useState } from "react";
import { useShelters } from "@/hooks/shelter/useShelters";
import { toast } from "sonner";
import Error from "@/app/(pages)/Error";
import ConfirmModal from "./ConfirmModal";
import ShelterPostButtons from "./ShelterPostButton";
import { ShieldCheck } from "lucide-react";
import { UsersRound } from "lucide-react";

const ShelterDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);
  const { setLevel, setCenter } = useMapStore(); // 변경될 좌표와 지도 레벨
  const { data: shelters = [] } = useShelters(); // 대피소 목록 불러오기
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);

  // TODO : 해당 페이지에서 선택된 주소를 기반으로 대피소를 선택해 주소를 zustand에 저장
  useEffect(() => {
    if (shelters.length === 0) {
      console.log("대피소 목록이 비어 있습니다.");
      return;
    }
    const matchedShelter = shelters.find(e => e.name === data?.shelter_name);
    if (matchedShelter) {
      setCenter({ lat: matchedShelter.lat, lng: matchedShelter.lng });
      setLevel(4);
    } else {
      toast("해당 이름의 대피소를 찾을 수 없어요.");
    }
  }, [data?.shelter_name, shelters, setCenter, setLevel]); // 리팩토링 진행할 때 MainMap 대신 DetailMap 사용 필요할 듯

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log("shelterDetailPost 로딩 에러", error);
    return <Error />;
  }
  if (!data) {
    return null;
  }

  const handleConfirmationModal = () => {
    return setToggleConfirmModal(toggleConfirmModal => !toggleConfirmModal);
  };

  const timeCreated = formatTime({ time: data.created_at });

  return (
    <section className="mx-5 mt-20 flex flex-col items-center gap-5">
      <article className="mb-5 w-full flex-col">
        <header className="mb-4 flex flex-col">
          <h1 className="text-[18px] leading-[27px] font-medium text-[#1A1A1A]">
            {data.title}
          </h1>
          <div className="flex w-full flex-row items-baseline justify-between">
            <span className="text-[14px] text-[#808080]">
              {data.user?.nickname}
            </span>
            <span className="text-[14px] text-[#B3B3B3]">{timeCreated}</span>
          </div>
        </header>

        <section className="mb-7 flex flex-col gap-2 text-[#666666]">
          <span className="flex flex-row gap-1">
            <UsersRound />
            혼잡도: {data.people}
          </span>
          <span className="flex flex-row gap-1">
            <ShieldCheck />
            위생상태: {data.cleanliness}
          </span>
        </section>

        {data.img_url?.startsWith("http") || data.img_url?.startsWith("/") ? (
          <div className="mb-5 flex items-center justify-center">
            <figure className="relative flex h-[350px] w-[350px] items-center justify-center overflow-hidden rounded-3xl border-1 border-gray-400">
              <Image
                src={data.img_url}
                alt="이미지를 불러오지 못했습니다."
                fill
                className="object-cover"
              />
            </figure>
          </div>
        ) : null}

        <p className="mb-10 min-h-10 w-full text-[16px]">{data.contents}</p>

        <figure className="flex h-40 overflow-hidden rounded-2xl">
          <MainMap />
          {/* TEST: (고민 내용) 포함정보가 많아 무거운 MainMap보다 DetailMap을 쓰는 걸 추천받았지만
          그렇게 되면 테이블과 게시글 정보 입력 함수도 고치게 되서 고민중이다. 아침에 회의 하기 */}
          {/* <DetailMap lat={37.5503} lng={126.9971} name={"우리동네"} /> */}
        </figure>
      </article>

      <ShelterPostButtons
        shelterPostId={data.id}
        onClickReport={handleConfirmationModal}
      />

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

export default ShelterDetailPost;
