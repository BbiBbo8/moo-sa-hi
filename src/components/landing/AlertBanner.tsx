"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
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
    <div className="w-full px-5 sm:px-[20px]">
      <Alert
        variant="destructive"
        className="flex w-full flex-row items-start gap-4 rounded-xl border border-red-500 bg-red-50 px-4 py-3 shadow-md"
      >
        {/* 아이콘 */}
        <div className="flex-shrink-0 pt-1">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>

        {/* 텍스트 */}
        <div className="flex min-w-0 flex-1 flex-col break-words">
          <AlertTitle className="line-clamp-none break-words whitespace-pre-wrap">
            {alert.message}
          </AlertTitle>
          <AlertDescription className="mt-1 w-full text-sm break-words whitespace-pre-wrap text-red-500">
            [{alert.region}] · {alert.createdAt}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default AlertBanner;
