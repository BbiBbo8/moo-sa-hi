import ShelterBanner from "@/components/map/ShelterBanner";
import React from "react";

const ShelterDetailPage = () => {
  return (
    <section className="flex flex-col gap-2">
      <div className="bg-accent h-40 w-full">지도</div>
      <h3 className="text-4xl font-semibold">대피소 명</h3>
      <ShelterBanner />
      <div className="flex-row">
        <div>장소 공유</div>
        <div>길 안내</div>
      </div>
      <p>대피소 정보 오류는 행정안전부 콜센터로 제보 바랍니다.</p>
      <p>02-2100-3399</p>
    </section>
  );
};

export default ShelterDetailPage;
