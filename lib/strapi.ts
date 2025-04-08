// lib/strapi.ts
import { BlogPost } from './types';

/**
 * Helper functions for Strapi API calls
 */

// Get the base URL for Strapi API
const getStrapiURL = () => {
  // Check for both possible environment variable names for backward compatibility
  return process.env.NEXT_PUBLIC_STRAPI_URL || 
         process.env.NEXT_PUBLIC_STRAPI_API_URL || 
         'https://drivewaydetailing-nextjs-production.up.railway.app';
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
    cache: 'no-store' as RequestCache,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const apiUrl = `${getStrapiURL()}/api/${endpoint}`;
  
  console.log('Fetching from API URL:', apiUrl);
  
  try {
    const res = await fetch(apiUrl, mergedOptions);
    
    console.log('API response status:', res.status);
    
    if (!res.ok) {
      console.error('Strapi API error:', res.status);
      throw new Error(`Strapi API error: ${res.status}`);
    }
    
    const data = await res.json();
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
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected response structure from Strapi:', data);
      return [];
    }
    
    console.log(`Retrieved ${data.data.length} blog posts`);
    
    // Transform the data - NOTE: Using uppercase field names to match Strapi
    return data.data.map((post: any) => {
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
          featuredImage: post.attributes?.Featured && post.attributes.Featured.data ? {
            data: {
              attributes: {
                url: post.attributes.Featured.data.attributes?.url || '',
                width: post.attributes.Featured.data.attributes?.width || 800,
                height: post.attributes.Featured.data.attributes?.height || 600
              }
            }
          } : null,
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
    // Note: Using uppercase Slug to match Strapi field name
    const data = await fetchAPI(`blog-posts?filters[Slug][$eq]=${slug}&populate=*`);
    
    // Make sure data.data exists and is an array
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.error(`No blog post found with slug: ${slug}`);
      return null;
    }
    
    // Get the first post matching the slug
    const post = data.data[0];
    
    // Transform the data to match expected structure
    return {
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
            attributes: {
              url: post.attributes.Featured.data?.attributes?.url || '',
              width: post.attributes.Featured.data?.attributes?.width || 800,
              height: post.attributes.Featured.data?.attributes?.height || 600
            }
          }
        } : null,
        seoKeywords: post.attributes.SEO
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
    // Note: Using uppercase field names in filters
    const data = await fetchAPI(
      `blog-posts?filters[Slug][$ne]=${currentSlug}&filters[Category][$eq]=${category}&populate=*&pagination[limit]=${limit}`
    );
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected response structure from Strapi when fetching related posts:', data);
      return [];
    }
    
    // Transform the data
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
            attributes: {
              url: post.attributes.Featured.data?.attributes?.url || '',
              width: post.attributes.Featured.data?.attributes?.width || 800,
              height: post.attributes.Featured.data?.attributes?.height || 600
            }
          }
        } : null,
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