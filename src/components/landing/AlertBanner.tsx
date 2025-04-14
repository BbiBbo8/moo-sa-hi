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
    <Alert variant="destructive" className="mx-20px">
      <AlertTriangle className="mr-2 h-4 w-4" />
      <AlertTitle>{alert.message}</AlertTitle>
      <AlertDescription>
        [ {alert.region}]
         {alert.createdAt}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
