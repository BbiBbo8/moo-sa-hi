export interface Database {
    public: {
      Tables: {
        users: {
          Row: {
            id: string;
            nickname: string | null;
            profile_image: string | null;
          };
          Insert: {
            id: string;
            nickname?: string | null;
            profile_image?: string | null;
          };
          Update: {
            nickname?: string | null;
            profile_image?: string | null;
          };
        };
      };
      Views: {};
      Functions: {};
      Enums: {};
    };
  }