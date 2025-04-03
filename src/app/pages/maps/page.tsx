import Link from "next/link";
import React from "react";

const KakaoMapList = () => {
  return (
    <div className="flex flex-col">
      <Link href={"/pages/maps/marker-arrangement"}>
        카카오맵 마커 중심 정렬
      </Link>
      <Link href={"/pages/maps/geolocation"}>현재 위치</Link>
    </div>
  );
};

export default KakaoMapList;
