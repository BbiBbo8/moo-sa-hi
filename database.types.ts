export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          comments: string | null
          created_at: string
          daily_post_id: number | null
          id: number
          shelter_post_id: number | null
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          daily_post_id?: number | null
          id?: number
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          daily_post_id?: number | null
          id?: number
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_daily_post_id_fkey"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_shelter_post_id_fkey"
            columns: ["shelter_post_id"]
            isOneToOne: false
            referencedRelation: "shelter_post"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_post: {
        Row: {
          contents: string | null
          created_at: string
          id: number
          img_url: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      helpfuls: {
        Row: {
          created_at: string
          daily_post_id: number
          id: number
          shelter_post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          daily_post_id: number
          id?: number
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          daily_post_id?: number
          id?: number
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "helpfuls_daily_post_id_fkey"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "helpfuls_shelter_post_id_fkey"
            columns: ["shelter_post_id"]
            isOneToOne: false
            referencedRelation: "shelter_post"
            referencedColumns: ["id"]
          },
        ]
      }
      shelter_post: {
        Row: {
          adress: string | null
          cleanliness: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents: string | null
          created_at: string
          id: number
          img_url: string | null
          people: Database["public"]["Enums"]["people_tags"] | null
          supplies: Database["public"]["Enums"]["supplies_tags"] | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          adress?: string | null
          cleanliness?: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          people?: Database["public"]["Enums"]["people_tags"] | null
          supplies?: Database["public"]["Enums"]["supplies_tags"] | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          adress?: string | null
          cleanliness?: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          people?: Database["public"]["Enums"]["people_tags"] | null
          supplies?: Database["public"]["Enums"]["supplies_tags"] | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shelter_post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          nickname: string
          profile_image: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nickname: string
          profile_image?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nickname?: string
          profile_image?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cleanliness_tags: "깨끗함" | "보통" | "더러움"
      people_tags: "한산" | "보통" | "붐빔" | "만원"
      supplies_tags: "생수" | "음식" | "담요" | "응급약품"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cleanliness_tags: ["깨끗함", "보통", "더러움"],
      people_tags: ["한산", "보통", "붐빔", "만원"],
      supplies_tags: ["생수", "음식", "담요", "응급약품"],
    },
  },
} as const
