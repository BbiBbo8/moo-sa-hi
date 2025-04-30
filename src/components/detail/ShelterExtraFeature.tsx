"use client";

import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import copy from "public/icons/shelter-detail/copy-solid.svg";
import share1 from "public/icons/shelter-detail/share-solid.svg";
import share2 from "public/icons/shelter-detail/share-nodes-solid 2.svg";

interface ShelterExtraFeatureProps {
  address?: string;
  name?: string;
}

const ShelterExtraFeature = ({ address, name }: ShelterExtraFeatureProps) => {
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("복사 완료!");
    } catch (error) {
      toast.error("복사 실패!");
      throw new Error();
      console.error("복사 실패:", error);
    }
  };

  return (
    <aside className="flex flex-col text-[16px] text-[#666666]">
      {/* 제목 + 출처 */}
      <header className="mb-5 flex flex-col gap-1">
        <h1 className="text-titleL text-gray-900">{name ?? "정보없음"}</h1>
        <div className="flex flex-col gap-2">
          <h5 className="text-bodyL text-left text-gray-600">
            {address ?? "정보 없음"}
          </h5>
          {/* 주소 복사 영역 */}
          <button
            onClick={() => handleCopyText(address ?? "주소 정보 없음")}
            className="text-bodyM bg-gray-20 flex w-fit flex-row gap-1 rounded-sm px-2 py-1 text-gray-600"
          >
            <Image src={copy} alt="주소복사" width={20} height={20} />
            주소 복사
          </button>
        </div>
      </header>

      {/* 공유 및 길 안내 */}
      <nav className="flex justify-evenly gap-2 text-center [&>*]:h-12">
        {/* 공유 */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: "대피소 위치 정보",
                  text: "근처 대피소 위치를 확인해보세요!",
                  url: window.location.href,
                })
                .then(() => toast.success("공유 성공!"))
                .catch(() => toast.error("공유 실패"));
            } else {
              toast.error("이 브라우저는 공유를 지원하지 않아요");
            }
          }}
          className="text-md flex w-1/2 items-center justify-center gap-2 rounded-full border-1 border-gray-200 px-4 py-3 text-gray-600"
        >
          <Image src={share2} alt="장소공유" width={24} height={24} />
          <p>장소 공유</p>
        </button>

        {/* 카카오맵 길안내 */}
        <a
          href={`https://map.kakao.com/?q=${encodeURIComponent(address ?? "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-md flex w-1/2 items-center justify-center gap-2 rounded-full border-1 border-gray-200 px-4 py-3 text-gray-600"
        >
          <Image src={share1} alt="길안내" width={24} height={24} />
          <p>길 안내</p>
        </a>
      </nav>
    </aside>
  );
};

export default ShelterExtraFeature;
