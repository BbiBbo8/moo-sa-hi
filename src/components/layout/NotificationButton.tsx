"use client";

import { useState } from "react";
import Image from "next/image";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import getUserData from "@/supabase/getUserData";
import useNotificationSubscription from "@/hooks/useNotificationSubscription";
import { useQuery } from "@tanstack/react-query";

const NotificationButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newalarm, setNewalarm] = useState(false); // 새로운 알림 상태

  // userId를 가져오는 useQuery 훅
  const { data: userData } = useQuery({
    queryKey: ["userId"],
    queryFn: getUserData,
    staleTime: Infinity, // userId는 자주 변하지 않으므로 캐시 유지
  });

  const userId = userData?.user?.id || null;

  useNotificationSubscription(userId, () => { // payload 파라미터 제거
    setNewalarm(true);
  });

  return (
    <div className="relative ml-4">
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="relative">
            <Image
              src={newalarm ? "/icons/alarm1.svg" : "/icons/alarm.svg"}
              alt="알림로고"
              height={21}
              width={21}
            />
          </button>
        </DropdownMenuTrigger>
        <NotificationDropdown
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
        />
      </DropdownMenu>
    </div>
  );
};

export default NotificationButton;