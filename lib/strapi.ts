// lib/strapi.ts
import { BlogPost, StrapiArrayResponse } from './types';
/**
 * Helper functions for Strapi API calls
 */

// Get the base URL for Strapi API
const getStrapiURL = () => {
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  };
  
  // Get the API token for authenticated requests
  const getStrapiToken = () => {
    return process.env.STRAPI_API_TOKEN || '';
  };
  
  // Get full media URL for Strapi media
  export const getStrapiMedia = (url: string | null) => {
    if (!url) return null;
    
    // If the URL is already absolute, return it as is
    if (url.startsWith('http')) {
      return url;
    }
    
    // Otherwise, prepend the Strapi URL
    return `${getStrapiURL()}${url}`;
  };
  
  // Fetch data from Strapi API
  export async function fetchAPI(endpoint: string, options = {}) {
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${getStrapiToken()}`,
      },
    };
  
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };
  
    const apiUrl = `${getStrapiURL()}/api/${endpoint}`;
    
    try {
      const res = await fetch(apiUrl, mergedOptions);
      
      if (!res.ok) {
        throw new Error(`Strapi API error: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('Error fetching from Strapi:', error);
      throw error;
    }
  }
  
  // Get all blog posts
  export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const data = await fetchAPI('blog-posts?populate=*');
      
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Unexpected response structure from Strapi:', data);
        return [];
      }
      
      // Transform the data to match your expected structure
      return data.data.map(post => ({
        id: post.id,
        attributes: {
          title: post.Title,
          slug: post.Slug,
          content: post.Content,
          excerpt: post.Excerpt,
          category: post.Category,
          publishedAt: post.publishedAt,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          featuredImage: post.Featured ? {
            data: {
              id: post.Featured.id,
              attributes: post.Featured
            }
          } : undefined,
          seoKeywords: post.SEO
        }
      }));
    } catch (error) {
      console.error('Error getting all blog posts:', error);
      return [];
    }
  }
  
  // Get a blog post by slug
  export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // Change filters[slug] to filters[Slug] to match your Strapi field name
      const data = await fetchAPI(`blog-posts?filters[Slug][$eq]=${slug}&populate=*`);
      
      // Make sure data.data exists and is an array
      if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
        console.error(`No blog post found with slug: ${slug}`);
        return null;
      }
      
      // Get the raw post data
      const rawPost = data.data[0];
      if (!rawPost) {
        console.error(`Blog post with slug ${slug} has invalid structure:`, rawPost);
        return null;
      }
      
      // Transform the data to match expected structure
      return {
        id: rawPost.id,
        attributes: {
          title: rawPost.Title,
          slug: rawPost.Slug,
          content: rawPost.Content,
          excerpt: rawPost.Excerpt,
          category: rawPost.Category,
          publishedAt: rawPost.publishedAt,
          createdAt: rawPost.createdAt,
          updatedAt: rawPost.updatedAt,
          featuredImage: rawPost.Featured ? {
            data: {
              id: rawPost.Featured.id,
              attributes: rawPost.Featured
            }
          } : undefined,
          seoKeywords: rawPost.SEO
        }
      };
    } catch (error) {
      console.error(`Error getting blog post with slug ${slug}:`, error);
      return null;
    }
  }
  
  // Get related blog posts
  export async function getRelatedPosts(currentSlug: string, category: string, limit = 2): Promise<BlogPost[]> {
    try {
      // Update to use capital field names in filters
      const data = await fetchAPI(
        `blog-posts?filters[Slug][$ne]=${currentSlug}&filters[Category][$eq]=${category}&populate=*&pagination[limit]=${limit}`
      );
      
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Unexpected response structure from Strapi when fetching related posts:', data);
        return [];
      }
      
      // Transform the data like we did for getAllBlogPosts
      return data.data.map(rawPost => ({
        id: rawPost.id,
        attributes: {
          title: rawPost.Title,
          slug: rawPost.Slug,
          content: rawPost.Content,
          excerpt: rawPost.Excerpt,
          category: rawPost.Category,
          publishedAt: rawPost.publishedAt,
          createdAt: rawPost.createdAt,
          updatedAt: rawPost.updatedAt,
          featuredImage: rawPost.Featured ? {
            data: {
              id: rawPost.Featured.id,
              attributes: rawPost.Featured
            }
          } : undefined,
          seoKeywords: rawPost.SEO
        }
      }));
    } catch (error) {
      console.error('Error getting related posts:', error);
      return [];
    }
  }
  
  // Format date for display
  export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }