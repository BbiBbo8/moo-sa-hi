import { useEffect } from 'react';
import createClient from '@/supabase/client';
import { Notification } from "@/types/notification";
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

const useNotificationSubscription = (
  userId: string | null,
  onNewNotification: (payload: RealtimePostgresInsertPayload<Notification>) => void
) => {
  useEffect(() => {
    if (!userId) return () => {}; // userId가 없으면 구독하지 않음

    const supabase = createClient();
    const notificationSubscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresInsertPayload<Notification>) => {
          onNewNotification(payload);
        }
      )
      .subscribe();

    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [userId, onNewNotification]);
};

export default useNotificationSubscription;