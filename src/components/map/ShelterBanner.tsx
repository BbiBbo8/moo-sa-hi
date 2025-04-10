"use client";

import React from "react";
import { Copy, Navigation, Share2 } from "lucide-react";

const ShelterBanner = () => {
  // 복사 이벤트 발생 함수
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사 완료!");
    } catch (e) {
      alert("복사 실패!");
    }
  };
  return (
    <>
      <div className="text-md flex w-full justify-evenly rounded-lg border px-4 py-3 text-center">
        {/* 클릭 시 텍스트를 복사 */}
        <button onClick={() => handleCopyText("서울특별시 어쩌고")}>
          <Copy />
        </button>
        <h5>서울특별시 지역동 어느길 0000-0000</h5>
      </div>
      {/* 장소 공유와 길 안내는 추후 도전 기능으로 추가 */}
      <div className="flex justify-evenly gap-2 text-center">
        <button className="text-md flex w-1/2 rounded-lg border px-4 py-3">
          <Share2 className="w-12" />
          <p>장소 공유</p>
        </button>
        <button className="text-md flex w-1/2 rounded-lg border px-4 py-3">
          <Navigation className="w-12" />
          <p>길 안내</p>
        </button>
      </div>
    </>
  );
};

export default ShelterBanner;
