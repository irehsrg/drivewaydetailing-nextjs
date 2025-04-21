import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';
import Breadcrumbs from '@/components/breadcrumbs';
import { getAllPosts } from '@/lib/api';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: "Car Detailing Blog | Auto Detailing Tips & News | Driveway Detailing",
  description: "Professional auto detailing tips, best practices, and industry news from Cookeville's premier mobile car detailing service. Learn how to maintain your vehicle's appearance.",
};

interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    coverImage: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        }
      }
    };
    categories: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        }
      }>
    };
  }
}

export default async function BlogPage() {
  const postsData = await getAllPosts();
  const posts = postsData.data as BlogPost[];
  const pagination = postsData.meta.pagination;

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Schema for the blog page
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Driveway Detailing Blog",
    "description": "Professional auto detailing tips, best practices, and industry news from Cookeville's premier mobile car detailing service.",
    "url": "https://dwdetail.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Driveway Detailing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dwdetail.com/images/logo-transparent-png.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.attributes.title,
      "datePublished": post.attributes.publishedAt,
      "dateModified": post.attributes.updatedAt,
      "mainEntityOfPage": `https://dwdetail.com/blog/${post.attributes.slug}`,
      "image": post.attributes.coverImage?.data?.attributes?.url ? 
        `${post.attributes.coverImage.data.attributes.url}` : 
        "https://dwdetail.com/images/logo-transparent-png.png"
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
        <section className={styles.blogHeader}>
          <h1><strong>Car Detailing Blog</strong></h1>
          <p className={styles.introText}>
            Explore our collection of <strong>professional auto detailing tips</strong>, 
            best practices, and industry insights. Learn how to keep your vehicle looking 
            its best and discover why professional detailing makes a difference.
          </p>
        </section>

        <div className={styles.blogGrid}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article 
                key={post.id} 
                className={styles.blogCard}
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                <Link href={`/blog/${post.attributes.slug}`} className={styles.blogLink}>
                  <div className={styles.blogImageWrapper}>
                    {post.attributes.coverImage?.data?.attributes?.url ? (
                      <Image
                        src={post.attributes.coverImage.data.attributes.url}
                        alt={post.attributes.coverImage.data.attributes.alternativeText || post.attributes.title}
                        width={400}
                        height={225}
                        className={styles.blogImage}
                        itemProp="image"
                      />
                    ) : (
                      <div className={styles.blogImagePlaceholder}>
                        <span>Driveway Detailing</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.blogContent}>
                    <h2 itemProp="headline">{post.attributes.title}</h2>
                    
                    <div className={styles.blogMeta}>
                      <span className={styles.blogDate}>
                        <FaCalendarAlt aria-hidden="true" />
                        <time itemProp="datePublished">
                          {formatDate(post.attributes.publishedAt)}
                        </time>
                      </span>
                      
                      {post.attributes.categories?.data?.length > 0 && (
                        <span className={styles.blogCategory}>
                          <FaTag aria-hidden="true" />
                          {post.attributes.categories.data[0].attributes.name}
                        </span>
                      )}
                    </div>
                    
                    <p className={styles.blogExcerpt} itemProp="description">
                      {post.attributes.excerpt || 
                       post.attributes.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>
                    
                    <span className={styles.readMore}>Read More</span>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className={styles.noPosts}>
              <h2>Coming Soon!</h2>
              <p>We're working on some great content. Check back soon for detailing tips and advice!</p>
            </div>
          )}
        </div>

        {pagination && pagination.pageCount > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((page) => (
              <Link 
                key={page} 
                href={`/blog?page=${page}`}
                className={`${styles.pageLink} ${page === pagination.page ? styles.activePage : ''}`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}