// Database 테이블 타입 정의
export interface Report {
    id: number;
    user_id: string;
    daily_post_id: number | null;
    shelter_post_id: number | null;
    reason: string | null;
    created_at: string;
  }
  
  // 신고 생성 시 사용할 타입
  export interface CreateReportData {
    user_id: string;
    daily_post_id?: number | null;
    shelter_post_id?: number | null;
    reason: string;
    created_at: string;
  }
  
  export type PostType = 'daily' | 'shelter';