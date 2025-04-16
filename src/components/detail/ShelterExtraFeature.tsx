"use client";

import React from "react";
import { Copy, Navigation, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShelterExtraFeatureProps {
  address?: string;
}

const ShelterExtraFeature = ({ address }: ShelterExtraFeatureProps) => {
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("복사 완료!");
    } catch (e) {
      toast.error("복사 실패!");
      console.error(e);
      throw new Error();
    }
  };

  return (
    <aside className="flex flex-col gap-2">
      {/* 주소 복사 영역 */}
      <div className="text-md flex w-full justify-evenly rounded-lg border px-4 py-3 text-center">
        <button onClick={() => handleCopyText(address ?? "주소 정보 없음")}>
          <Copy />
        </button>
        <h5 className="truncate">{address ?? "정보 없음"}</h5>
      </div>

      {/* 공유 및 길 안내 */}
      <nav className="flex justify-evenly gap-2 text-center">
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
          className="text-md flex w-1/2 items-center justify-center gap-2 rounded-lg border px-4 py-3"
        >
          <Share2 className="w-6" />
          <p>장소 공유</p>
        </button>

        {/* 카카오맵 길안내 */}
        <a
          href={`https://map.kakao.com/?q=${encodeURIComponent(address ?? "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-md flex w-1/2 items-center justify-center gap-2 rounded-lg border px-4 py-3"
        >
          <Navigation className="w-6" />
          <p>길 안내</p>
        </a>
      </nav>
    </aside>
  );
};

export default ShelterExtraFeature;
