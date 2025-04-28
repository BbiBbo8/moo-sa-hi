"use client";

import Image from "next/image";
import { formatTime } from "@/utils/formatTime";
import Loading from "@/app/(pages)/Loading";
import MainMap from "../../map/MainMap";
import { useMapStore } from "@/store/useMapStore";
import { useEffect, useState } from "react";
import { useShelters } from "@/hooks/shelter/useShelters";
import Error from "@/app/(pages)/Error";
import ConfirmModal from "./ShelterConfirmModal";
import ShelterPostButtons from "./ShelterPostButton";
import useShelterPostDetailQuery from "@/hooks/community/shelterPostDetailsQuery";

const ShelterDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);
  const { setLevel, setCenter } = useMapStore(); // 변경될 좌표와 지도 레벨
  const { data: shelters = [], isLoading: isShelterLoading } = useShelters(); // 대피소 목록 불러오기
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);

  // TODO : 해당 페이지에서 선택된 주소를 기반으로 대피소를 선택해 주소를 zustand에 저장
  useEffect(() => {
    if (!isShelterLoading && shelters.length === 0) {
      return;
    }
    const matchedShelter = shelters.find(e => e.name === data?.shelter_name);
    if (matchedShelter) {
      setCenter({ lat: matchedShelter.lat, lng: matchedShelter.lng });
      setLevel(4);
    }
  }, [data?.shelter_name, shelters, setCenter, setLevel]); // 리팩토링 진행할 때 MainMap 대신 DetailMap 사용 필요할 듯

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

  const timeCreated = formatTime({ time: data.created_at });

  return (
    <section className="mx-5 mt-20 flex max-w-[640px] flex-col items-center gap-5">
      <article className="mb-5 w-full flex-col">
        <header className="mb-4 flex flex-col">
          <h1 className="text-bodyXL leading-[27px] font-medium text-gray-900">
            {data.title}
          </h1>
          <div className="flex w-full flex-row items-baseline justify-between">
            <span className="text-bodyM text-gray-500">
              {data.user?.nickname}
            </span>
            <span className="text-numEng text-gray-300">{timeCreated}</span>
          </div>
        </header>

        <section className="text-numEng mb-7 flex flex-col justify-center gap-2 text-gray-500">
          <span className="flex flex-row gap-1">
            <Image
              src={"/icons/community/thumbtack.svg"}
              alt=""
              width={24}
              height={24}
            />
            혼잡도: <span className="text-gray-800">{data.people}</span>
          </span>
          <span className="flex flex-row gap-1">
            <Image
              src={"/icons/community/thumbtack.svg"}
              alt=""
              width={24}
              height={24}
            />
            위생상태: <span className="text-gray-800">{data.cleanliness}</span>
          </span>
        </section>

        {data.img_url?.startsWith("http") || data.img_url?.startsWith("/") ? (
          <div className="mb-5 flex items-center justify-center">
            <figure className="relative flex aspect-[1/1] w-full max-w-[640px] min-w-[280px] items-center justify-center overflow-hidden rounded-3xl border-1 border-gray-400">
              <Image
                src={data.img_url}
                alt="이미지를 불러오지 못했습니다."
                fill
                className="object-cover"
              />
            </figure>
          </div>
        ) : null}

        <p className="text-bodyL mb-8 min-h-10 w-full text-gray-800">
          {data.contents}
        </p>

        <figure className="flex aspect-[2/1] max-w-[640px] min-w-[280px] overflow-hidden rounded-2xl">
          <MainMap />
          {/* TEST: (고민 내용) 포함정보가 많아 무거운 MainMap보다 DetailMap을 쓰는 걸 추천받았지만
          그렇게 되면 테이블과 게시글 정보 입력 함수도 고치게 되서 고민중이다. 아침에 회의 하기 */}
          {/* <DetailMap lat={37.5503} lng={126.9971} name={"우리동네"} /> */}
        </figure>
        <span className="text-bodyL text-gray-600">{data.shelter_name}</span>
      </article>

      <ShelterPostButtons shelterPostId={data.id} />

      {/* 모달창 */}
      <ConfirmModal
        id={id}
        onOpen={toggleConfirmModal}
        onClose={handleConfirmationModal}
      />
      {/* NOTE: 화면에 보이는 회색 줄 */}
      <div className="mb-11 h-3 w-full bg-[#F7F7F7]" />
    </section>
  );
};

export default ShelterDetailPost;
