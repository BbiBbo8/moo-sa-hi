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
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comment_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          reportcount: number | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          reportcount?: number | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          reportcount?: number | null
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
          daily_post_id: number | null
          id: number
          shelter_post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          daily_post_id?: number | null
          id?: number
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          daily_post_id?: number | null
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
      images: {
        Row: {
          created_at: string
          daily_post_id: number | null
          id: number
          img_url: string | null
          shelter_post_id: number | null
        }
        Insert: {
          created_at?: string
          daily_post_id?: number | null
          id?: number
          img_url?: string | null
          shelter_post_id?: number | null
        }
        Update: {
          created_at?: string
          daily_post_id?: number | null
          id?: number
          img_url?: string | null
          shelter_post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_images_daily_post"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_images_shelter_post"
            columns: ["shelter_post_id"]
            isOneToOne: false
            referencedRelation: "shelter_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_daily_post_id_fkey"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_daily_post_id_fkey1"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_daily_post_id_fkey2"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_shelter_post_id_fkey"
            columns: ["shelter_post_id"]
            isOneToOne: false
            referencedRelation: "shelter_post"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          daily_post_id: number | null
          id: number
          reason: string | null
          shelter_post_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          daily_post_id?: number | null
          id?: number
          reason?: string | null
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          daily_post_id?: number | null
          id?: number
          reason?: string | null
          shelter_post_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_daily_post_id_fkey"
            columns: ["daily_post_id"]
            isOneToOne: false
            referencedRelation: "daily_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_shelter_post_id_fkey"
            columns: ["shelter_post_id"]
            isOneToOne: false
            referencedRelation: "shelter_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shelter_post: {
        Row: {
          cleanliness: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents: string | null
          created_at: string
          id: number
          img_url: string | null
          people: Database["public"]["Enums"]["people_tags"] | null
          reportcount: number | null
          shelter_name: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          cleanliness?: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          people?: Database["public"]["Enums"]["people_tags"] | null
          reportcount?: number | null
          shelter_name?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          cleanliness?: Database["public"]["Enums"]["cleanliness_tags"] | null
          contents?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          people?: Database["public"]["Enums"]["people_tags"] | null
          reportcount?: number | null
          shelter_name?: string | null
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
        }
        Insert: {
          created_at?: string | null
          id?: string
          nickname: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nickname?: string
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
      people_tags: "한산" | "보통" | "만원"
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
      people_tags: ["한산", "보통", "만원"],
    },
  },
} as const
