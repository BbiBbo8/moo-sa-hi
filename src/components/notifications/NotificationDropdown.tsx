import { useEffect, useState, useRef } from "react";
import createClient from "@/supabase/client";
import getUserData from "@/supabase/getUserData";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Notification {
  created_at: string | null;
  id: string;
  is_read: boolean | null;
  message: string;
  comment_id: number | null;
  type: string;
  user_id: string;
}

interface NotificationDropdownProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

function NotificationDropdown({
  open,
  onOpenChange,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchId = async () => {
      const userData = await getUserData();
      setUserId(userData?.user?.id || null);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    const notificationSubscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        payload => {
          console.log("드롭다운 새로운 알림 도착!", payload.new);
          const newNotification = payload.new as Notification;
          setNotifications(prevNotifications => [
            newNotification,
            ...prevNotifications,
          ]);
          toast.success(newNotification.message);
        },
      )
      .subscribe();

    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    if (open && userId) {
      const fetchNotifications = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("알림 목록 불러오기 오류:", error);
        } else if (data) {
          setNotifications(data);
        }
      };

      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [open, userId]);

  return (
    <DropdownMenuContent
      ref={dropdownRef}
      className="z-50 w-80 overflow-hidden rounded-md bg-white shadow-lg"
      align="end"
      sideOffset={5}
    >
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700">알림</h2>
        <button
          onClick={() => onOpenChange(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        ></button>
      </div>
      <ScrollArea className="max-h-96">
        <ul className="divide-y divide-gray-200">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className="px-4 py-3 hover:bg-gray-50"
              >
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(notification.created_at!).toLocaleString()}
                </p>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="px-4 py-3 text-center text-gray-500">
              새로운 알림이 없습니다.
            </DropdownMenuItem>
          )}
        </ul>
      </ScrollArea>
      {notifications.length > 0 && (
        <div className="bg-gray-100 px-4 py-3 text-right">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded bg-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-400 focus:outline-none"
          >
            닫기
          </button>
          <button className="ml-2 rounded bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none">
            모두 읽음
          </button>
        </div>
      )}
    </DropdownMenuContent>
  );
}

export default NotificationDropdown;