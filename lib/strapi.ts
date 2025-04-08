// lib/strapi.ts
import { BlogPost, StrapiArrayResponse } from './types';
/**
 * Helper functions for Strapi API calls
 */

// Get the base URL for Strapi API
const getStrapiURL = () => {
    return process.env.NEXT_PUBLIC_STRAPI_URL || 'https://drivewaydetailing-nextjs-production.up.railway.app';
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
    
    console.log('Fetching from API URL:', apiUrl);
    console.log('Using token:', getStrapiToken() ? 'Token exists' : 'No token available');
    
    try {
      const res = await fetch(apiUrl, mergedOptions);
      
      console.log('API response status:', res.status);
      
      if (!res.ok) {
        console.error('Strapi API error:', res.status);
        throw new Error(`Strapi API error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('API response data structure:', JSON.stringify(data).slice(0, 200) + '...');
      return data;
    } catch (error) {
      console.error('Error fetching from Strapi:', error);
      throw error;
    }
  }
  
  export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      console.log('Getting all blog posts...');
      const data = await fetchAPI('blog-posts?populate=*');
      
      console.log('API Response structure:', JSON.stringify(data).slice(0, 300) + '...');
      
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Unexpected response structure from Strapi:', data);
        return [];
      }
      
      console.log(`Retrieved ${data.data.length} blog posts`);
      
      // Transform the data - make sure we're accessing fields through attributes
      return data.data.map((post: any) => {
        console.log('Processing post:', post.id);
        console.log('Post structure:', JSON.stringify(post).slice(0, 200) + '...');
        
        return {
          id: post.id,
          attributes: {
            title: post.attributes?.Title || 'No Title',
            slug: post.attributes?.Slug || 'no-slug',
            content: post.attributes?.Content || '',
            excerpt: post.attributes?.Excerpt || '',
            category: post.attributes?.Category || '',
            publishedAt: post.attributes?.publishedAt,
            createdAt: post.attributes?.createdAt,
            updatedAt: post.attributes?.updatedAt,
            featuredImage: post.attributes?.Featured ? {
              data: {
                id: post.attributes.Featured.id,
                attributes: post.attributes.Featured
              }
            } : undefined,
            seoKeywords: post.attributes?.SEO || ''
          }
        };
      });
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
      return data.data.map((post: any) => ({
        id: post.id,
        attributes: {
          title: post.attributes.Title,
          slug: post.attributes.Slug,
          content: post.attributes.Content,
          excerpt: post.attributes.Excerpt,
          category: post.attributes.Category,
          publishedAt: post.attributes.publishedAt,
          createdAt: post.attributes.createdAt,
          updatedAt: post.attributes.updatedAt,
          featuredImage: post.attributes.Featured ? {
            data: {
              id: post.attributes.Featured.id,
              attributes: post.attributes.Featured
            }
          } : undefined,
          seoKeywords: post.attributes.SEO
        }
      }));
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
      return data.data.map((post: any) => ({
        id: post.id,
        attributes: {
          title: post.attributes.Title,
          slug: post.attributes.Slug,
          content: post.attributes.Content,
          excerpt: post.attributes.Excerpt,
          category: post.attributes.Category,
          publishedAt: post.attributes.publishedAt,
          createdAt: post.attributes.createdAt,
          updatedAt: post.attributes.updatedAt,
          featuredImage: post.attributes.Featured ? {
            data: {
              id: post.attributes.Featured.id,
              attributes: post.attributes.Featured
            }
          } : undefined,
          seoKeywords: post.attributes.SEO
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