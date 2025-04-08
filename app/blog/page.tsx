import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import { getAllBlogPosts, getStrapiMedia, formatDate } from '@/lib/strapi';
import { BlogPost } from '@/lib/types';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Auto Detailing & Car Care Blog | Driveway Detailing',
  description: 'Read the latest articles on auto detailing best practices, car care tips, and professional advice from Cookeville\'s trusted detailing experts.',
};

export default async function Blog() {
  console.log('Rendering Blog page...');
  
  let blogPosts: BlogPost[] = [];
  let errorMessage = '';
  
  try {
    console.log('Fetching blog posts...');
    blogPosts = await getAllBlogPosts();
    console.log(`Successfully fetched ${blogPosts.length} blog posts`);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'An unknown error occurred';
    }
    blogPosts = [];
  }
  
  // Create schema data safely with error handling
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Driveway Detailing Blog",
    "description": "Expert articles on auto detailing, car care, and automotive technology",
    "url": "https://dwdetail.com/blog",
    "blogPost": (blogPosts || [])
      .filter(post => post && post.attributes)
      .map(post => ({
        "@type": "BlogPosting",
        "headline": post.attributes.title,
        "description": post.attributes.excerpt,
        "datePublished": post.attributes.publishedAt,
        "author": {
          "@type": "Person",
          "name": "Alex Joines"
        },
        "url": `https://dwdetail.com/blog/${post.attributes.slug}`,
        "image": getStrapiMedia(post.attributes.featuredImage?.data?.attributes?.url || null) ||
          'https://dwdetail.com/images/logo-transparent-png.png'
      }))
  };

  return (
    <div className={styles.blogPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPageSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.blogContainer}>
        <header className={styles.blogHeader}>
          <h1><strong>Auto Detailing Insights</strong></h1>
          <p className={styles.introText}>
            Explore our collection of <strong>expert car care articles</strong>, insights on
            <mark> technology in detailing</mark>, and professional tips to keep your vehicle
            looking its best from <em>Cookeville's premier mobile detailing service</em>.
          </p>
        </header>

        <div className={styles.categoriesBar}>
          <div className={styles.categoryFilter}>
            <span className={`${styles.categoryTag} ${styles.active}`}>All</span>
            <span className={styles.categoryTag}>Technology</span>
            <span className={styles.categoryTag}>Car Care</span>
            <span className={styles.categoryTag}>Seasonal</span>
            <span className={styles.categoryTag}>DIY</span>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search articles..." />
          </div>
        </div>

        {errorMessage && (
          <div className={styles.errorMessage}>
            <h2>Error loading blog posts</h2>
            <p>{errorMessage}</p>
            <p>Please try again later or contact support if the issue persists.</p>
          </div>
        )}

        {!errorMessage && blogPosts.length === 0 ? (
          <div className={styles.noPosts}>
            <h2>No blog posts found</h2>
            <p>We're working on creating new content. Check back soon!</p>
          </div>
        ) : (
          <section className={styles.blogGrid}>
            {blogPosts.map((post: BlogPost) => (
              <article key={post.id} className={styles.blogCard}>
                <Link href={`/blog/${post.attributes.slug}`}>
                  <div className={styles.blogImageContainer}>
                    <div className={styles.categoryBadge}>{post.attributes.category}</div>
                    {post.attributes.featuredImage?.data ? (
                      <Image 
                        src={getStrapiMedia(post.attributes.featuredImage.data.attributes.url) || ''}
                        alt={post.attributes.title || 'Blog post image'}
                        width={400}
                        height={250}
                        className={styles.blogImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        No image available
                      </div>
                    )}
                  </div>
                  <div className={styles.blogContent}>
                    <div className={styles.metaInfo}>
                      <span className={styles.date}>
                        {post.attributes.publishedAt ? formatDate(post.attributes.publishedAt) : 'No date'}
                      </span>
                      <span className={styles.author}>by Alex Joines</span>
                    </div>
                    <h2 className={styles.blogTitle}>{post.attributes.title}</h2>
                    <p className={styles.blogExcerpt}>{post.attributes.excerpt}</p>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        )}

        <div className={styles.pagination}>
          <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
          <span className={styles.pageNumber}>2</span>
          <span className={styles.pageNumber}>3</span>
          <span className={styles.pageNumber}>→</span>
        </div>

        <section className={styles.subscribeBanner}>
          <div className={styles.subscribeContent}>
            <h2>Stay Updated with Our Latest Articles</h2>
            <p>Subscribe to our newsletter for expert detailing tips and automotive insights</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}