import ShelterExtraFeature from "@/components/map/ShelterExtraFeature";
import Link from "next/link";
import React from "react";
import fetchSheltersApi from "@/app/api/fetchSheltersApi";

const ShelterDetailPage = async ({ params }: { params: { id: string } }) => {
  // 모든 대피소 가져오기
  const shelters = await fetchSheltersApi();
  //전체 목록중 특정 대피소만 가져오기
  const shelter = shelters.find(s => s.id === params.id);

  // 지상/지하 매핑
  const FloorType = (code?: string) => {
    if (!code) return "알 수 없음";
    if (code === "1" || code.includes("지하")) return "지하";
    if (code === "2" || code.includes("지상")) return "지상";
    return code;
  };
  
  // 개방 여부 매핑
  const OpenStatus = (value?: string) => {
    if (value === "Y") return "개방중";
    if (value === "N") return "폐쇄됨";
    return "알 수 없음";
  };

  return (
    <section className="flex flex-col gap-3 p-2">
      <div className="bg-accent h-40 w-full text-center">지도</div>
      <div className="flex-col">
        <h3 className="text-3xl font-semibold">{shelter?.name}</h3>
        <h5 className="mt-3 text-right text-xs text-gray-400">
          행정 안전부 제공
        </h5>
      </div>
      <ShelterExtraFeature address={shelter?.address} />
      <div className="bg-accent flex w-full flex-col gap-1 rounded-lg border px-4 py-3 text-sm">
        <p className="text-lg">
          담당 전화:{" "}
          {shelter?.phone ? (
            <Link href={`tel:${shelter.phone}`} className="text-indigo-500">
              {shelter.phone}
            </Link>
          ) : (
            "정보 없음"
          )}
        </p>
        <p className="text-lg">수용인원: {shelter?.capacity}명</p>
        <p className="text-lg">시설 규모: {shelter?.scale}</p>
        <p className="text-lg">대피 장소: {FloorType(shelter?.locationType)}</p>
        <p className="text-lg">개방 여부: {OpenStatus(shelter?.isOpen)}</p>
        <p className="text-lg">평상시 활용유형: {shelter?.usageType}</p>
      </div>
      <article className="relative p-2">
        <p>대피소 정보 오류는 행정안전부 콜센터로 제보 바랍니다.</p>
        <p className="text-md">
          행정안전부 콜센터:{" "}
            <Link href={`tel:02-2100-3399`} className="text-indigo-500">
              02-2100-3399
            </Link>
        </p>
      </article>
    </section>
  );
};

export default ShelterDetailPage;
