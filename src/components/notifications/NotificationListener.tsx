import { useEffect, useState } from 'react';
import createClient from "@/supabase/client";
import getUserData from '@/supabase/getUserData';
import { toast } from "sonner";

interface NotificationRow {
  created_at: string | null;
  id: string;
  is_read: boolean | null;
  message: string;
  related_id: string;
  type: string;
  user_id: string;
}

interface Notification extends NotificationRow {}

function NotificationListener() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const userData = await getUserData();
      setUserId(userData?.user?.id || null);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const supabase = createClient();

    const notificationSubscription = supabase
      .channel(`notifications:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, payload => {
        console.log('새로운 알림 도착!', payload.new);
        const newNotification = payload.new as Notification;
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);

        toast.success(newNotification.message, {
          duration: 5000,
        });
      })
      .subscribe();

    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [userId]);

  return null;
}

export default NotificationListener;