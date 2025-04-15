"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchDisasterAlert from "@/app/api/fetchDisasterAlert";

const AlertBanner = () => {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ["disaster-alerts"],
    queryFn: fetchDisasterAlert,
    refetchInterval: 1000 * 60,
  });

  const alert = alerts?.[0];
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || error || !alert) return null;

  return (
    <div className="px-[20px]">
      <div className="flex w-full items-start justify-between rounded-lg bg-white px-4 py-3 shadow">
        {/* 왼쪽: 아이콘 + 메시지 */}
        <div className="flex items-start gap-2 pr-2">
          <Image
            src="/icons/megaphone.svg"
            alt="경고 아이콘"
            width={18}
            height={18}
            className="mt-1"
          />
          <p
            className={`text-[16px] text-gray-800 ${
              isOpen ? "whitespace-pre-wrap" : "max-w-[250px] truncate"
            }`}
          >
            {alert.message}
          </p>
        </div>

        {/* 오른쪽: 드롭다운 버튼 */}
        <button onClick={() => setIsOpen(prev => !prev)} className="shrink-0">
          <Image
            src={
              isOpen
                ? "/icons/chevron-up-solid.svg"
                : "/icons/chevron-down-solid.svg"
            }
            alt="드롭다운"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;