export interface Notification {
    created_at: string | null;
    id: string;
    is_read: boolean | null;
    message: string;
    comment_id: number | null;
    type: string;
    user_id: string;
    post_id: number | null;
    post_type: 'shelter_post' | 'daily_post' | null;
  }