"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getUserData from "@/supabase/getUserData";
import useNotificationSubscription from "@/hooks/useNotificationSubscription";

const NotificationButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newalarm, setNewalarm] = useState(false); // 새로운 알림 상태
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const userData = await getUserData();
      setUserId(userData?.user?.id || null);
    };
    fetchId();
  }, []);

  useNotificationSubscription(userId, payload => {
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
              height={24}
              width={24}
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