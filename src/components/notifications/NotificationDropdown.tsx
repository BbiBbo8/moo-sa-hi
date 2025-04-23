"use client";

import { useEffect, useState, useRef } from "react";
import getUserData from "@/supabase/getUserData";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import useNotificationSubscription from "@/hooks/useNotificationSubscription";
import createClient from "@/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PATH from "@/constants/PATH";
import {Notification} from "@/types/notification"

interface NotificationDropdownProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

function NotificationDropdown({ open, onOpenChange }: NotificationDropdownProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchId = async () => {
      const userData = await getUserData();
      setUserId(userData?.user?.id || null);
    };
    fetchId();
  }, []);

  // 알림 목록 불러오기 (드롭다운 열릴 때)
  const { data: notifications } = useQuery<Notification[], Error>({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!userId) return [];
      const supabase = createClient();
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!open && !!userId,
  });

  // Realtime 알림 구독
  useNotificationSubscription(userId, (payload) => {
    queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    toast.success((payload.new as Notification).message);
  });

  const handleNotificationClick = (notification: Notification) => {
    onOpenChange(false); // 드롭다운 닫기
    if (notification.post_id && notification.post_type) {
      if (notification.post_type === 'shelter_post') {
        router.push(`${PATH.COMMUNITYSHELTER}/${notification.post_id}`);
        console.log(notification.post_id)
      } else if (notification.post_type === 'daily_post') {
        router.push(`${PATH.COMMUNITYDAILY}/${notification.post_id}`);
      }
      // 필요하다면 읽음 상태 업데이트 API 호출 추가
    }
  };

  return (
    <DropdownMenuContent
      ref={dropdownRef}
      className="z-50 w-80 overflow-hidden rounded-md bg-white shadow-lg"
      align="end"
      sideOffset={5}
    >
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700">알림</h2>
        <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none" />
      </div>
      <ScrollArea className="max-h-96">
        <ul className="divide-y divide-gray-200">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
                <DropdownMenuItem
                key={notification.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer" // 클릭 가능하도록 cursor 추가
                onClick={() => handleNotificationClick(notification)}
              >
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400">{new Date(notification.created_at!).toLocaleString()}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="px-4 py-3 text-center text-gray-500">
              새로운 알림이 없습니다.
            </DropdownMenuItem>
          )}
        </ul>
      </ScrollArea>
    </DropdownMenuContent>
  );
}

export default NotificationDropdown;