import { useEffect } from 'react';
import createClient from '@/supabase/client';

function useNotificationSubscription(userId: string | null, onNewNotification: (payload: any) => void) {
  useEffect(() => {
    if (!userId) return () => {}; // userId가 없으면 구독하지 않음

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
          onNewNotification(payload);
        }
      )
      .subscribe();

    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [userId, onNewNotification]);
}

export default useNotificationSubscription;