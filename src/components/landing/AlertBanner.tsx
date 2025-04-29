"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchDisasterAlert from "@/app/api/fetchDisasterAlert";
import chevronUp from "/public/icons/chevron-up-solid.svg";
import chevronDown from "/public/icons/chevron-down-solid.svg";
import bullhorn from "/public/icons/community/bullhorn-solid.svg";

const AlertBanner = () => {
  const {
    data: alerts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["disaster-alerts"],
    queryFn: fetchDisasterAlert,
    refetchInterval: 1000 * 60,
  });

  const alert = alerts?.[0];
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || error || !alert) return null;

  return (
    <div className="bg-gray-20 flex w-full items-start justify-between px-5 py-5">
      {/* 왼쪽: 아이콘 + 메시지 */}
      <div className="flex items-start gap-2 pr-2">
        <Image
          src={bullhorn}
          alt="경고 아이콘"
          width={20}
          height={20}
          className="mt-1"
        />
        <p
          className={`py-1.5 text-[16px] leading-none text-gray-800 ${
            isOpen ? "whitespace-pre-wrap" : "max-w-[280px] truncate"
          }`}
        >
          [ {alert.region}] &nbsp;{alert.message}
        </p>
      </div>

      {/* 오른쪽: 드롭다운 버튼 */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex shrink-0 items-center justify-center py-2"
      >
        <Image
          src={isOpen ? chevronUp : chevronDown}
          alt="드롭다운"
          width={18}
          height={18}
        />
      </button>
    </div>
  );
};

export default AlertBanner;
