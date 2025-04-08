// lib/types.ts

// Type for Strapi array responses
export interface StrapiArrayResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Type for image data
export interface ImageData {
  data: {
    attributes: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string;
    };
  } | null;
}

// Type for a blog post
export interface BlogPost {
  id: string;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    featuredImage: ImageData | null;
    seoKeywords: string;
  };
}