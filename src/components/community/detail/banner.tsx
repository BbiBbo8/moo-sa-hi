"use client";

import Image from "next/image";
import React, { useState } from "react";
import bullhorn from "public/icons/community/bullhorn-solid.svg";
import xmark from "public/icons/community/xmark-solid.svg";

const CommunityBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <>
      {isBannerVisible && (
        <div className="flex w-full flex-row items-center justify-between gap-2 bg-[#F7F7F7] px-5 py-2">
          <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-600">
            <Image src={bullhorn} alt="icon" width={24} height={24} />
            <span>대피소 관련 경험과 정보를 솔직하게 공유해주세요.</span>
          </div>
          <Image
            src={xmark}
            alt="icon"
            width={20}
            height={20}
            onClick={() => setIsBannerVisible(false)}
          />
        </div>
      )}
    </>
  );
};

export default CommunityBanner;
