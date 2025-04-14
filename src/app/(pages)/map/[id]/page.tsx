import ShelterExtraFeature from "@/components/map/ShelterExtraFeature";
import Link from "next/link";
import React from "react";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";

const ShelterDetailPage = async ({ params }: { params: { id: string } }) => {
  // 모든 대피소 가져오기
  const shelters = await fetchSheltersApi();
  //전체 목록중 특정 대피소만 가져오기
  const shelter = shelters.find(s => s.id === params.id);

  return (
    <section className="flex flex-col gap-3 p-2">
      <div className="bg-accent h-40 w-full text-center">지도</div>
      <div className="flex-col">
        <h3 className="text-3xl font-semibold">{shelter?.name}</h3>
        <h5 className="mt-3 text-right text-xs text-gray-400">
          행정 안전부 제공
        </h5>
      </div>
      <ShelterExtraFeature />
      <div className="bg-accent flex w-full flex-col gap-1 rounded-lg border px-4 py-3 text-sm">
        <p className="text-lg">
          담당 전화:{" "}
          <Link href="tel:02-000-0000" className="text-indigo-500">
            {/* a 태그로 자동 전화걸기 */}
            02-000-0000
          </Link>
        </p>
        <p className="text-lg">수용인원: 000명</p>
        <p className="text-lg">시설 규모: 0000m</p>
        <p className="text-lg">대피 장소: 지하</p>
        <p className="text-lg">개방 여부: OPEN</p>
        <p className="text-lg">평상시 활용유형: 주차장</p>
      </div>
      <article className="relative p-2">
        <p>대피소 정보 오류는 행정안전부 콜센터로 제보 바랍니다.</p>
        <p>02-2100-3399</p>
      </article>
    </section>
  );
};

export default ShelterDetailPage;
