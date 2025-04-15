"use client";

import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchDisasterAlert from "@/app/api/fetchDisasterAlert";

// 색상 테마 매핑 함수
const getTheme = (type: string) => {
  const severeTypes = ["지진", "태풍", "해일"];
  const warningTypes = ["호우", "강풍", "폭염", "산불",];

  if (severeTypes.includes(type)) {
    return {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-800",
      icon: "text-red-600",
      sub: "text-red-500",
      iconBg: "bg-red-100",
    };
  }

  if (warningTypes.includes(type)) {
    return {
      bg: "bg-amber-50",
      border: "border-amber-500",
      text: "text-amber-800",
      icon: "text-amber-600",
      sub: "text-amber-500",
      iconBg: "bg-amber-100",
    };
  }

  return {
    bg: "bg-gray-50",
    border: "border-gray-300",
    text: "text-gray-800",
    icon: "text-gray-600",
    sub: "text-gray-500",
    iconBg: "bg-gray-100",
  };
};

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

  const theme = getTheme(alert.disasterType);

  return (
    <div
      className={`mx-[20px] flex items-center gap-4 rounded-xl border ${theme.border} ${theme.bg} px-5 py-4 shadow-md transition-all duration-300`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.iconBg} ${theme.icon}`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className={`flex flex-col ${theme.text}`}>
        <p className="text-base leading-snug font-semibold">{alert.message}</p>
        <p className={`text-sm ${theme.sub} mt-1`}>
          {alert.region} · {alert.createdAt}
        </p>
      </div>
    </div>
  );
};

export default AlertBanner;
