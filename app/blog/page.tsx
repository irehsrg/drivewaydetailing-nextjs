import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from '../blog.module.css';

// Types for our blog post data
interface Post {
  _id: string;
  title: string;
  mainImage: any;
  publishedAt: string;
  author: {
    name: string;
    image: any;
  };
  categories: Array<{
    _id: string;
    title: string;
  }>;
  body: any;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Driveway Detailing Blog',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Driveway Detailing Blog`,
    description: post.excerpt || 'Read our latest car detailing tips and insights on the Driveway Detailing blog.',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read our latest car detailing tips and insights on the Driveway Detailing blog.',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Driveway Detailing'],
      images: post.mainImage ? [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }
  `);
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Fetch a single post by slug
async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      body,
      publishedAt,
      author->{name, image},
      categories[]->{_id, title},
      "excerpt": array::join(string::split(pt::text(body[0...1]), "")[0...200], "") + "..."
    }
  `, { slug });
}

// Fetch related posts
async function getRelatedPosts(currentPostId: string, categoryIds: string[], limit = 3) {
  // Get posts in the same categories, excluding the current post
  return await client.fetch(`
    *[_type == "post" && _id != $currentPostId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      categories[]->{title}
    }
  `, { 
    currentPostId,
    categoryIds,
    limit
  });
}

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

// Custom components for the PortableText renderer
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className={styles.postContentImage}>
          <Image
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={600}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
          {value.caption && (
            <figcaption>{value.caption}</figcaption>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className={styles.inlineLink}>
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Get category IDs for related posts query
  const categoryIds = post.categories?.map((cat: { _id: string }) => cat._id) || [];
  
  // Get related posts if there are categories
  const relatedPosts = categoryIds.length > 0 
    ? await getRelatedPosts(post._id, categoryIds) 
    : [];

  return (
    <div className={styles.blogPage}>
      <Breadcrumbs />
      <div className={styles.blogContainer}>
        <article className={styles.singlePost}>
          <header className={styles.postHeader}>
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                width={1200}
                height={600}
                className={styles.postHeaderImage}
              />
            )}
            
            <h1 className={styles.postHeaderTitle}>{post.title}</h1>
            
            <div className={styles.postHeaderMeta}>
              <div className={styles.postHeaderAuthor}>
                {post.author?.image && (
                  <Image
                    src={urlFor(post.author.image).width(50).height(50).url()}
                    alt={post.author.name}
                    width={50}
                    height={50}
                    className={styles.postHeaderAuthorImage}
                  />
                )}
                <div className={styles.postHeaderAuthorInfo}>
                  <span className={styles.postHeaderAuthorName}>{post.author?.name}</span>
                  <time className={styles.postHeaderDate}>{formatDate(post.publishedAt)}</time>
                </div>
              </div>
              
              {post.categories && post.categories.length > 0 && (
                <div className={styles.postHeaderCategories}>
                  {post.categories.map((category: { _id: string; title: string }) => (
                    <span key={category._id} className={styles.postHeaderCategory}>
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          <div className={styles.postContent}>
            <PortableText value={post.body} components={components} />
          </div>
        </article>
        
        {relatedPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <h3>Related Articles</h3>
            <div className={styles.relatedPostsGrid}>
              {relatedPosts.map((relatedPost: any) => (
                <article key={relatedPost._id} className={styles.postCard}>
                  <div className={styles.postImage}>
                    {relatedPost.mainImage && (
                      <Image
                        src={urlFor(relatedPost.mainImage).width(400).height(200).url()}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className={styles.image}
                      />
                    )}
                  </div>
                  <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.postDate}>{formatDate(relatedPost.publishedAt)}</span>
                      {relatedPost.categories && relatedPost.categories.length > 0 && (
                        <span className={styles.postCategory}>{relatedPost.categories[0].title}</span>
                      )}
                    </div>
                    <h2 className={styles.postTitle}>
                      <Link href={`/blog/${relatedPost.slug.current}`}>
                        {relatedPost.title}
                      </Link>
                    </h2>
                    <div className={styles.postFooter}>
                      <Link href={`/blog/${relatedPost.slug.current}`} className={styles.readMore}>
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}