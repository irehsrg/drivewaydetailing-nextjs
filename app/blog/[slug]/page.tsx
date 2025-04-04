import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from '@/components/breadcrumbs';
import { getBlogPostBySlug, getRelatedPosts, getStrapiMedia, formatDate } from '@/lib/strapi';
import { BlogPost } from '@/lib/types';
import styles from './blogpost.module.css';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Driveway Detailing',
      description: 'The requested blog post could not be found. Browse our other articles about auto detailing and car care.',
    };
  }
  
  return {
    title: `${post.attributes.title} | Auto Detailing Blog`,
    description: post.attributes.excerpt,
    keywords: post.attributes.seoKeywords ? post.attributes.seoKeywords.split(',').map((keyword: string) => keyword.trim()) : [],
    openGraph: {
      title: post.attributes.title,
      description: post.attributes.excerpt,
      type: 'article',
      publishedTime: post.attributes.publishedAt,
      authors: ['Alex Joines'],
      images: [
        {
          url: getStrapiMedia(post.attributes.featuredImage?.data?.attributes?.url) || 
            'https://dwdetail.com/images/logo-transparent-png.png',
          width: 1200,
          height: 630,
          alt: post.attributes.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.attributes.title,
      description: post.attributes.excerpt,
      images: [
        getStrapiMedia(post.attributes.featuredImage?.data?.attributes?.url) || 
          'https://dwdetail.com/images/logo-transparent-png.png'
      ],
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts based on the category
  const relatedPosts = await getRelatedPosts(params.slug, post.attributes.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.attributes.title,
    "image": getStrapiMedia(post.attributes.featuredImage?.data?.attributes?.url) || 
      'https://dwdetail.com/images/logo-transparent-png.png',
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
    "description": post.attributes.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dwdetail.com/blog/${params.slug}`
    }
  };

  // Extract keywords from SEO Keywords field
  const keywords = post.attributes.seoKeywords 
    ? post.attributes.seoKeywords.split(',').map((keyword: string) => keyword.trim()) 
    : [];

  return (
    <div className={styles.blogPostPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.blogPostContainer}>
        <article className={styles.blogPost}>
          <header className={styles.postHeader}>
            <div className={styles.categoryBadge}>{post.attributes.category}</div>
            <h1>{post.attributes.title}</h1>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{formatDate(post.attributes.publishedAt)}</span>
              <span className={styles.postAuthor}>by Alex Joines</span>
            </div>
          </header>

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

          <div className={styles.postContent}>
            <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
          </div>

          <div className={styles.postFooter}>
            <div className={styles.tags}>
              {keywords.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.shareLinks}>
              <span>Share: </span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://dwdetail.com/blog/${params.slug}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">Facebook</a>
              <a href={`https://twitter.com/intent/tweet?url=https://dwdetail.com/blog/${params.slug}&text=${encodeURIComponent(post.attributes.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">Twitter</a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://dwdetail.com/blog/${params.slug}&title=${encodeURIComponent(post.attributes.title)}&summary=${encodeURIComponent(post.attributes.excerpt)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">LinkedIn</a>
            </div>
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.authorCard}>
            <Image
              src="/images/profile-pic.jpg"
              alt="Alex Joines"
              width={80}
              height={80}
              className={styles.authorImage}
            />
            <div className={styles.authorInfo}>
              <h3>Alex Joines</h3>
              <p>Founder of Driveway Detailing and auto care expert with a passion for bringing professional detailing services to Cookeville.</p>
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className={styles.relatedPosts}>
              <h3>Related Articles</h3>
              <div className={styles.relatedPostsList}>
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <Link href={`/blog/${relatedPost.attributes.slug}`} key={relatedPost.id} className={styles.relatedPostCard}>
                    {relatedPost.attributes.featuredImage?.data && (
                      <Image
                        src={getStrapiMedia(relatedPost.attributes.featuredImage.data.attributes.url) || ''}
                        alt={relatedPost.attributes.title}
                        width={100}
                        height={60}
                        className={styles.relatedPostImage}
                      />
                    )}
                    <div className={styles.relatedPostInfo}>
                      <h4>{relatedPost.attributes.title}</h4>
                      <span>{formatDate(relatedPost.attributes.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.ctaCard}>
            <h3>Ready for Professional Detailing?</h3>
            <p>Experience the Driveway Detailing difference with our mobile service in Cookeville.</p>
            <Link href="/contact" className={styles.ctaButton}>Book a Service</Link>
          </div>
        </aside>
      </div>
      
      <section className={styles.commentSection}>
        <h3>Leave a Comment</h3>
        <form className={styles.commentForm}>
          <div className={styles.formFields}>
            <div className={styles.formField}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required/>
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
          </div>
          <div className={styles.formField}>
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" rows={5} required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Post Comment</button>
        </form>
      </section>
    </div>
  );
}