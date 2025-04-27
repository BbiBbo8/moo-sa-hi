"use client";

import Image from "next/image";
import React, { useState } from "react";

const CommunityBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <>
      {isBannerVisible && (
        <div className="top-16 left-5 flex w-full flex-row items-center justify-between gap-2 bg-[#F7F7F7] px-5 py-2">
          <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-600">
            <Image
              src={"/icons/community/bullhorn-solid.svg"}
              alt={"icon"}
              width={24}
              height={24}
            />
            <span>대피소 관련 경험과 정보를 솔직하게 공유해주세요.</span>
          </div>
          <Image
            src={"/icons/community/xmark-solid.svg"}
            alt={"icon"}
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
