import ShelterBanner from "@/components/map/ShelterBanner";
import React from "react";

const ShelterDetailPage = () => {
  return (
    <>
      <div>지도</div>
      <h3 className="text-4xl">대피소 명</h3>
      <ShelterBanner />
      <div>장소 공유</div>
      <div>길 안내</div>
      <p>대피소 정보 오류는 행정안전부 콜센터로 제보 바랍니다.</p>
      <p>02-2100-3399</p>
    </>
  );
};

export default ShelterDetailPage;
