export type PostType = 'daily' | 'shelter';

export interface ReportData {
  user_id: string;
  reason: string;
  daily_post_id?: number | null;
  shelter_post_id?: number | null;
}