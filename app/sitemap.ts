import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dwdetail.com';
  
  // Get all blog posts for the sitemap
  const postsData = await getAllPosts(1, 100).catch(() => ({ data: [] }));
  const posts = postsData.data || [];
  
  // Get all categories for the sitemap
  const categoriesData = await getAllCategories().catch(() => ({ data: [] }));
  const categories = categoriesData.data || [];
  
  // Create post entries for sitemap
  const postEntries = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.attributes.slug}`,
    lastModified: new Date(post.attributes.updatedAt || post.attributes.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  // Create category entries for sitemap
  const categoryEntries = categories.map((category: any) => ({
    url: `${baseUrl}/blog/category/${category.attributes.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...postEntries,
    ...categoryEntries,
  ];
}