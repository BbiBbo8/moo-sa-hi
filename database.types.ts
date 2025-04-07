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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
