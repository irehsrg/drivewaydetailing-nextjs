import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/breadcrumbs';
import { getBlogPostBySlug, getStrapiMedia, formatDate, getRelatedPosts } from '@/lib/strapi';
import { BlogPost } from '@/lib/types';
import styles from './blogpost.module.css';

// Generate metadata for the blog post
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Find the blog post by slug
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${post.attributes.title} | Auto Detailing Blog`,
    description: post.attributes.excerpt,
    keywords: post.attributes.seoKeywords,
    openGraph: {
      title: post.attributes.title,
      description: post.attributes.excerpt,
      type: 'article',
      publishedTime: post.attributes.publishedAt,
      images: [
        {
          url: getStrapiMedia(post.attributes.featuredImage?.data?.attributes.url || null) || '/images/logo-transparent-png.png',
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log(`Rendering blog post page for slug: ${params.slug}`);
  
  // Find the blog post by slug
  const post = await getBlogPostBySlug(params.slug);
  
  // If post not found, return Next.js 404 page
  if (!post) {
    console.log(`Blog post not found for slug: ${params.slug}`);
    notFound();
  }
  
  // Get related posts
  const relatedPosts = await getRelatedPosts(params.slug, post.attributes.category, 2);
  
  // Create BlogPosting schema for SEO
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.attributes.title,
    "description": post.attributes.excerpt,
    "image": getStrapiMedia(post.attributes.featuredImage?.data?.attributes.url || null) || '/images/logo-transparent-png.png',
    "datePublished": post.attributes.publishedAt,
    "dateModified": post.attributes.updatedAt,
    "author": {
      "@type": "Person",
      "name": "Alex Joines"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Driveway Detailing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dwdetail.com/images/logo-transparent-png.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dwdetail.com/blog/${post.attributes.slug}`
    }
  };

  return (
    <div className={styles.blogPostPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.blogPostContainer}>
        <article className={styles.blogPost}>
          <header className={styles.blogPostHeader}>
            <div className={styles.categoryBadge}>{post.attributes.category}</div>
            <h1>{post.attributes.title}</h1>
            
            <div className={styles.metaInfo}>
              <span className={styles.date}>
                {formatDate(post.attributes.publishedAt)}
              </span>
              <span className={styles.author}>by Alex Joines</span>
            </div>
            
            {post.attributes.featuredImage?.data && (
              <div className={styles.featuredImageContainer}>
                <Image
                  src={getStrapiMedia(post.attributes.featuredImage.data.attributes.url) || ''}
                  alt={post.attributes.title}
                  width={1200}
                  height={675}
                  className={styles.featuredImage}
                  priority
                />
              </div>
            )}
          </header>
          
          <div 
            className={styles.blogPostContent}
            dangerouslySetInnerHTML={{ __html: post.attributes.content }}
          />
          
          <footer className={styles.blogPostFooter}>
            <div className={styles.tags}>
              <span className={styles.tagLabel}>Category:</span>
              <span className={styles.tag}>{post.attributes.category}</span>
            </div>
            
            <div className={styles.shareButtons}>
              <span>Share:</span>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=https://dwdetail.com/blog/${post.attributes.slug}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on Facebook"
              >
                Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.attributes.title)}&url=https://dwdetail.com/blog/${post.attributes.slug}`} 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
                aria-label="Share on Twitter"
              >
                Twitter
              </a>
            </div>
          </footer>
        </article>
        
        {relatedPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <h2>Related Articles</h2>
            <div className={styles.relatedPostsGrid}>
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className={styles.relatedPostCard}>
                  <Link href={`/blog/${relatedPost.attributes.slug}`}>
                    <div className={styles.relatedPostImage}>
                      {relatedPost.attributes.featuredImage?.data ? (
                        <Image
                          src={getStrapiMedia(relatedPost.attributes.featuredImage.data.attributes.url) || ''}
                          alt={relatedPost.attributes.title}
                          width={300}
                          height={200}
                          className={styles.relatedImage}
                        />
                      ) : (
                        <div className={styles.placeholderImage}>
                          No image available
                        </div>
                      )}
                    </div>
                    <h3>{relatedPost.attributes.title}</h3>
                    <span className={styles.readMore}>Read More →</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
        
        <div className={styles.backToBlogs}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}