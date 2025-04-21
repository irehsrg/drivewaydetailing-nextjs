import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import { getPostBySlug, getAllPosts } from '@/lib/api';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from './blog.module.css';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Driveway Detailing',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${post.attributes.title} | Car Detailing Blog`;
  const description = post.attributes.excerpt || post.attributes.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.attributes.coverImage?.data?.attributes?.url ? 
        [{
          url: post.attributes.coverImage.data.attributes.url,
          width: 1200,
          height: 630,
          alt: post.attributes.title,
        }] : undefined,
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await getAllPosts(1, 100);
  
  return posts.data.map((post: any) => ({
    slug: post.attributes.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className={styles.blogPage}>
        <div className={styles.blogContainer}>
          <div className={styles.singlePost}>
            <h1>Blog Post Not Found</h1>
            <p>The requested blog post could not be found.</p>
            <Link href="/blog" className={styles.backButton}>
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Schema for the blog post
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.attributes.title,
    "image": post.attributes.coverImage?.data?.attributes?.url || "https://dwdetail.com/images/logo-transparent-png.png",
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
    "description": post.attributes.excerpt || post.attributes.content.replace(/<[^>]*>/g, '').substring(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dwdetail.com/blog/${post.attributes.slug}`
    }
  };

  return (
    <div className={styles.blogPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.blogContainer}>
        <article 
          className={styles.singlePost}
          itemScope 
          itemType="https://schema.org/BlogPosting"
        >
          <header className={styles.postHeader}>
            <h1 itemProp="headline">{post.attributes.title}</h1>
            
            <div className={styles.postMeta}>
              <div className={styles.postDate}>
                <FaCalendarAlt aria-hidden="true" />
                <time itemProp="datePublished">
                  {formatDate(post.attributes.publishedAt)}
                </time>
              </div>
              
              <div className={styles.postAuthor}>
                <FaUser aria-hidden="true" />
                <span itemProp="author">Alex Joines</span>
              </div>
              
              {post.attributes.categories?.data?.length > 0 && (
                <div className={styles.postCategories}>
                  <FaTag aria-hidden="true" />
                  {post.attributes.categories.data.map((category: any, index: number) => (
                    <React.Fragment key={category.id}>
                      <Link 
                        href={`/blog/category/${category.attributes.slug}`} 
                        className={styles.categoryLink}
                      >
                        {category.attributes.name}
                      </Link>
                      {index < post.attributes.categories.data.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          {post.attributes.coverImage?.data?.attributes?.url && (
            <Image
              src={post.attributes.coverImage.data.attributes.url}
              alt={post.attributes.coverImage.data.attributes.alternativeText || post.attributes.title}
              width={1200}
              height={675}
              className={styles.featuredImage}
              itemProp="image"
              priority
            />
          )}
          
          <div 
            className={styles.postContent}
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: post.attributes.content }}
          />
          
          <Link href="/blog" className={styles.backButton}>
            <FaArrowLeft /> Back to Blog
          </Link>
        </article>
      </div>
    </div>
  );
}