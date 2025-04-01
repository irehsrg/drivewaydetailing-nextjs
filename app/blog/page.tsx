import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Auto Detailing & AI Blog | Expert Car Care Tips & Insights',
  description: 'Read the latest articles on auto detailing best practices, AI in the automotive industry, and professional car care advice from Cookeville\'s trusted detailing experts.',
};

// Sample blog post data (in a real app, this would come from a CMS or API)
const blogPosts = [
  {
    id: 'ai-revolution-auto-detailing',
    title: 'How AI is Revolutionizing Auto Detailing',
    excerpt: 'Discover how artificial intelligence is transforming the car detailing industry with smart solutions and predictive maintenance.',
    date: 'April 1, 2025',
    author: 'Alex Joines',
    coverImage: '/images/ai-auto-detailing.jpg',
    category: 'Technology'
  },
  {
    id: 'ceramic-coating-guide',
    title: 'The Ultimate Guide to Ceramic Coating',
    excerpt: 'Everything you need to know about ceramic coatings - benefits, application process, maintenance, and why it\'s worth the investment.',
    date: 'March 15, 2025',
    author: 'Alex Joines',
    coverImage: '/images/ceramic-coating.jpg',
    category: 'Car Care'
  },
  {
    id: 'winter-detailing-tips',
    title: 'Winter Car Detailing: Protecting Your Vehicle',
    excerpt: 'Essential tips for maintaining your car\'s appearance and protecting it from harsh winter conditions in Tennessee.',
    date: 'February 28, 2025',
    author: 'Alex Joines',
    coverImage: '/images/winter-detailing.jpg',
    category: 'Seasonal'
  },
  {
    id: 'ai-powered-tools',
    title: 'Top AI-Powered Tools for Car Owners',
    excerpt: 'Explore the latest AI applications that help car owners maintain their vehicles and simplify the detailing process.',
    date: 'February 15, 2025',
    author: 'Alex Joines',
    coverImage: '/images/ai-tools.jpg',
    category: 'Technology'
  }
];

export default function Blog() {
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Driveway Detailing Blog",
    "description": "Expert articles on auto detailing, car care, and automotive AI technology",
    "url": "https://dwdetail.com/blog",
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://dwdetail.com/blog/${post.id}`,
      "image": `https://dwdetail.com${post.coverImage}`
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
          <h1><strong>Auto Detailing & AI Insights</strong></h1>
          <p className={styles.introText}>
            Explore our collection of <strong>expert car care articles</strong>, insights on 
            <mark> AI technology in automotive</mark>, and professional tips to keep your vehicle
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

        <section className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <article key={index} className={styles.blogCard}>
              <Link href={`/blog/${post.id}`}>
                <div className={styles.blogImageContainer}>
                  <div className={styles.categoryBadge}>{post.category}</div>
                  <Image 
                    src={post.coverImage} 
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.blogImage}
                  />
                </div>
                <div className={styles.blogContent}>
                  <div className={styles.metaInfo}>
                    <span className={styles.date}>{post.date}</span>
                    <span className={styles.author}>by {post.author}</span>
                  </div>
                  <h2 className={styles.blogTitle}>{post.title}</h2>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <span className={styles.readMore}>Read More →</span>
                </div>
              </Link>
            </article>
          ))}
        </section>

        <div className={styles.pagination}>
          <span className={`${styles.pageNumber} ${styles.active}`}>1</span>
          <span className={styles.pageNumber}>2</span>
          <span className={styles.pageNumber}>3</span>
          <span className={styles.pageNumber}>→</span>
        </div>

        <section className={styles.subscribeBanner}>
          <div className={styles.subscribeContent}>
            <h2>Stay Updated with Our Latest Articles</h2>
            <p>Subscribe to our newsletter for expert detailing tips and automotive tech insights</p>
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