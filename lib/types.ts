// lib/types.ts

// Strapi media type
export interface StrapiMedia {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
        formats: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: string;
        provider: string;
        createdAt: string;
        updatedAt: string;
      };
    } | null;
  }
  
  // Blog post attributes
  export interface BlogPostAttributes {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    seoKeywords?: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    featuredImage?: StrapiMedia;
  }
  
  // Blog post
  export interface BlogPost {
    id: number;
    attributes: BlogPostAttributes;
  }
  
  // Strapi response format for single item
  export interface StrapiSingleResponse<T> {
    data: T;
    meta: any;
  }
  
  // Strapi response format for collections
  export interface StrapiArrayResponse<T> {
    data: T[];
    meta: any;
  }