export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          tagline: string
          description: string | null
          status: 'live' | 'wip' | 'archived'
          repo_url: string | null
          demo_url: string | null
          cover_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: { [key: string]: Json | undefined }
        Update: { [key: string]: Json | undefined }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          published: boolean
          excerpt: string | null
          category: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: { [key: string]: Json | undefined }
        Update: { [key: string]: Json | undefined }
        Relationships: []
      }
      guestbook: {
        Row: {
          id: string
          name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          message: string
          created_at?: string
        }
        Update: {
          name?: string
          message?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          slug: string
          count: number
        }
        Insert: { [key: string]: Json | undefined }
        Update: { [key: string]: Json | undefined }
        Relationships: []
      }
    }
    Views: {
      [_ in string]: {
        Row: {
          [_ in string]: Json
        }
      }
    }
    Functions: {
      [_ in string]: {
        Args: {
          [_ in string]: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in string]: string
    }
    CompositeTypes: {
      [_ in string]: string
    }
  }
}
