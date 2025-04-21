// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Fetch data from Strapi API
 * @param path - API endpoint
 * @param urlParams - URL parameters
 */
export async function fetchAPI(path: string, urlParams: Record<string, string> = {}) {
  // Merge default and custom params
  const params: Record<string, string> = {
    populate: '*',
    ...urlParams,
  };

  // Build query string
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Make API call
  const res = await fetch(`${API_URL}/api${path}${queryString ? `?${queryString}` : ''}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    console.error(`API error: ${res.status} ${res.statusText}`);
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json;
}

/**
 * Get all blog posts
 */
export async function getAllPosts(page = 1, pageSize = 9) {
  const data = await fetchAPI('/articles', {
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort': 'publishedAt:desc',
  });
  return data;
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI('/articles', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });
  return data.data[0];
}

/**
 * Get all blog categories
 */
export async function getAllCategories() {
  const data = await fetchAPI('/categories');
  return data;
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categoryId: string, page = 1, pageSize = 9) {
  const data = await fetchAPI('/articles', {
    filters: {
      categories: {
        id: {
          $eq: categoryId,
        },
      },
    },
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort': 'publishedAt:desc',
  });
  return data;
}