export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          handle: string
          description: string | null
          price: number
          compare_at_price: number | null
          currency: string
          image_url: string | null
          images: string[] | null
          category: string | null
          tags: string[] | null
          is_active: boolean
          sort_order: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          handle: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          currency?: string
          image_url?: string | null
          images?: string[] | null
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          sort_order?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          handle?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          currency?: string
          image_url?: string | null
          images?: string[] | null
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          sort_order?: number | null
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          created_at: string
          id: string
          product_handle: string
          rating: number
          review_date: string | null
          review_text: string | null
          reviewer_name: string
          source: string | null
          source_url: string | null
          verified_purchase: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_handle: string
          rating?: number
          review_date?: string | null
          review_text?: string | null
          reviewer_name: string
          source?: string | null
          source_url?: string | null
          verified_purchase?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          product_handle?: string
          rating?: number
          review_date?: string | null
          review_text?: string | null
          reviewer_name?: string
          source?: string | null
          source_url?: string | null
          verified_purchase?: boolean | null
        }
        Relationships: []
      }
      product_videos: {
        Row: {
          created_at: string
          id: string
          product_handle: string
          sort_order: number | null
          title: string | null
          video_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_handle: string
          sort_order?: number | null
          title?: string | null
          video_url: string
        }
        Update: {
          created_at?: string
          id?: string
          product_handle?: string
          sort_order?: number | null
          title?: string | null
          video_url?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]
export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
export const Constants = {
  public: {
    Enums: {},
  },
} as const
