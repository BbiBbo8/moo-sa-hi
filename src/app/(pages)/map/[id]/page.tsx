import ShelterBanner from "@/components/map/ShelterBanner";
import { Navigation, Share2 } from "lucide-react";
import React from "react";

const ShelterDetailPage = () => {
  return (
    <section className="flex flex-col gap-3 p-2">
      <div className="bg-accent h-40 w-full text-center">지도</div>
      <h3 className="text-3xl font-semibold">대피소 명</h3>
      <ShelterBanner />
      <div className="flex justify-evenly gap-2 text-center">
        <div className="flex w-1/2 rounded-lg border px-4 py-3 text-sm">
          <Share2 className="w-12" />
          <p>장소 공유</p>
        </div>
        <div className="flex w-1/2 rounded-lg border px-4 py-3 text-sm">
          <Navigation className="w-12" />
          <p>길 안내</p>
        </div>
      </div>
      <div className="bg-accent flex w-full flex-col gap-1 rounded-lg border px-4 py-3 text-sm">
        <p className="text-lg">담당 전화: 02-000-0000</p>
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
