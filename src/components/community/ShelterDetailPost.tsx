"use client";

import useShelterPostDetailQuery from "@/utils/shelterPostDetailsQuery";
import Image from "next/image";
import { format } from "date-fns";
import Loading from "@/app/(pages)/Loading";
import MainMap from "../map/MainMap";
import { useMapStore } from "@/store/useMapStore";
import { Shelter } from "@/types/shelter";
import { useEffect } from "react";
import { useShelters } from "@/hooks/shelter/useShelters";
import { toast } from "sonner";

const ShelterDetailPost = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useShelterPostDetailQuery(id);
  const { setLevel, setCenter } = useMapStore(); // 변경될 좌표와 지도 레벨
  const { data: shelters = [] } = useShelters(); // 대피소 목록 불러오기

  // TODO : 해당 페이지에서 선택된 주소를 기반으로 대피소를 선택해 주소를 zustand에 저장
  const TEMP_SHELTER_NAME = "청구목욕탕"; // 임시값

  useEffect(() => {
    if (shelters.length === 0) {
      console.log("대피소 목록이 비어 있습니다.");
      return;
    }
    const matchedShelter = shelters.find(
      shelter => shelter.name === TEMP_SHELTER_NAME,
    );

    if (matchedShelter) {
      setCenter({ lat: matchedShelter.lat, lng: matchedShelter.lng });
      setLevel(4);
      console.log("matchedShelter123", matchedShelter);
    } else {
      console.log("matchedShelter", matchedShelter);

      toast("해당 이름의 대피소를 찾을 수 없어요.");
    }
  }, [shelters, setCenter, setLevel]);

  if (isLoading) return <Loading />;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!data) return null;

  const timeCreated = format(new Date(data.created_at), "yyyy.MM.dd");

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

        <figure className="flex h-40 overflow-hidden rounded-2xl">
          <MainMap />
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
