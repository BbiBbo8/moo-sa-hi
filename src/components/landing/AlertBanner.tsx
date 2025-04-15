"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchDisasterAlert from "@/app/api/fetchDisasterAlert";

const AlertBanner = () => {
  const {
    data: alerts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["disaster-alerts"],
    queryFn: fetchDisasterAlert,
    refetchInterval: 1000 * 60, // 1분마다 새로고침
  });

  const alert = alerts?.[0];

  if (isLoading || error || !alert) return null;

  return (
    <div className="px-[20px]">
      <div className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 shadow">
        {/* 왼쪽: 아이콘 + 메시지 */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/megaphone.svg"
            alt="경고 아이콘"
            width={18}
            height={18}
            className="inline-block"
          />
          <p className="max-w-[250px] truncate text-[16px] text-gray-800">
            {alert.message}
          </p>
        </div>

        {/* 오른쪽: 드롭다운 */}
        <Image
            src="/icons/chevron-down-solid.svg"
            alt="경고 아이콘"
            width={20}
            height={20}
            className="inline-block"
          />
      </div>
    </div>
  );
};

export default AlertBanner;